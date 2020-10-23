import React, { useState, useEffect, Dispatch } from 'react';
import { Button } from '@material-ui/core';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import { CSVLink } from 'react-csv';
import Card from '../../Card';
import CardHeader from '../../CardHeader';
import { reducer, SetPayloadActionType, useThunkReducer } from '../../../../api/useThunkReducer';
import { fetchData } from '../../../../api/apiConstants';
import Spin from '../../Spin';
import PageBody from '../../PageBody';
import TableData from '../TableData';

export type ITravelTimeLookup = {
  id: number | string;
  shopCode1: string;
  shopCode2: string;
  estimatedTravelTime: number;
};

const columns = [
  { title: 'Shop 1', dataIndex: 'shopCode1', editable: true, require: true, width: 146 },
  { title: 'Shop 2', dataIndex: 'shopCode2', editable: true, require: true, width: 146 },
  {
    title: 'Estimated Travel Time (hrs)',
    dataIndex: 'estimatedTravelTime',
    editable: true,
    require: true,
    width: 200,
    inputStyle: {
      width: 146,
    },
    registerOption: {
      pattern: {
        value: /^[0-9]+.[0-9]*[0-9]$/,
        message: 'Invalid',
      },
    },
  },
];

export default function FormTravelTimeLookup(): JSX.Element {
  const [dataSource, setDataSource] = useState<ITravelTimeLookup[]>([]);
  const headersCSV = [
    { label: 'Shop 1', key: 'shopCode1' },
    { label: 'Shop 2', key: 'shopCode2' },
    { label: 'Estimated Travel Time', key: 'estimatedTravelTime' },
  ];
  const [data, dispatchRequest] = useThunkReducer(reducer, {
    error: null,
    loading: false,
    data: [],
  });

  // const [shopData, dispatchShopRequest] = useThunkReducer(reducer, {
  //   error: null,
  //   loading: false,
  //   data: [],
  // });

  // useEffect(() => {
  //   dispatchShopRequest((e: Dispatch<SetPayloadActionType>) =>
  //     fetchData(e, 'ShopsGrid', 'startDate=2020-01-01&endDate=2020-10-10')
  //   );
  // }, []);

  useEffect(() => {
    dispatchRequest((e: Dispatch<SetPayloadActionType>) => fetchData(e, 'CONSTRAINTS_TTL', ''));
  }, []);

  useEffect(() => {
    setDataSource(
      (data.data || []).map((item: ITravelTimeLookup) => ({
        ...item,
        id: `${item.shopCode1}-${item.shopCode2}`,
      }))
    );
  }, [data]);

  const handleSaveData = (resData: any) => {
    const rowDataIndex = dataSource.findIndex((item) => item.id === resData.id);
    const newDataSource = [...dataSource];
    newDataSource[rowDataIndex] = {
      ...resData,
      shopCode1: resData.shopCode1.value,
      shopCode2: resData.shopCode2.value,
    };
    setDataSource(newDataSource);
  };
  // const shopOptions: IShop[] = (shopData.data || [])
  //   .filter((item: any) => item.shopCode !== 'Unassigned')
  //   .map((item: any) => {
  //     const shop: IShop = { value: item.shopCode, label: item.shopCode, color: item.shopColor };
  //     return shop;
  //   });

  return (
    <Card>
      <CardHeader
        title={'Travel Time Lookup'}
        rightAction={
          <CSVLink filename={'travel-time-lookup.csv'} data={dataSource} headers={headersCSV}>
            <Button>
              <GetAppOutlinedIcon />
            </Button>
          </CSVLink>
        }
      />
      <PageBody>
        <Spin spinning={data.loading}>
          <TableData
            initialData={dataSource}
            columns={columns}
            onFinish={handleSaveData}
            queryString={'CONSTRAINTS_TTL'}
            pathVariableKey={'code'}
            colActionStyle={{ width: 'auto' }}
          />
        </Spin>
      </PageBody>
    </Card>
  );
}
