import React, { useState, useEffect } from 'react';
import FormRowItem from './FormRowItem';
import { Button } from '@material-ui/core';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import Card from '../../Card';
import CardHeader from '../../CardHeader';
import { CSVLink } from 'react-csv';
import { reducer, useThunkReducer } from '../../../../../pages/api/useThunkReducer';
import { fetchData } from '../../../../../pages/api/apiConstants';
import Spin from '../../Spin';
import PageBody from '../../PageBody';
import { IShop } from '../../InputSelectShop';

export type ITravelTimeLookup = {
  id: number | string;
  shopCode1: string;
  shopCode2: string;
  estimatedTravelTime: number;
};

export default function FormTravelTimeLookup(): JSX.Element {
  const [dataSource, setDataSource] = useState<ITravelTimeLookup[]>([]);
  const headersCSV = [
    { label: 'Shop 1', key: 'shopCode1' },
    { label: 'Shop 2', key: 'shopCode2' },
    { label: 'Estimated Travel Time', key: 'estimatedTravelTime' }
  ];
  const [data, dispatchRequest] = useThunkReducer(reducer, {
    error: null,
    loading: false,
    data: []
  });
  const [shopData, dispatchShopRequest] = useThunkReducer(reducer, {
    error: null,
    loading: false,
    data: []
  });

  useEffect(() => {
    dispatchShopRequest((e) =>
      fetchData(e, 'ShopsGrid', 'startDate=2020-01-01&endDate=2020-10-10')
    );
  }, []);

  useEffect(() => {
    if (shopData.data && shopData.data.length > 0) {
      dispatchRequest((e) => fetchData(e, 'CONSTRAINTS_TTL', ''));
    }
  }, [shopData.data]);

  useEffect(() => {
    setDataSource(
      (data.data || []).map((item) => ({ ...item, id: `${item.shopCode1}-${item.shopCode2}` }))
    );
  }, [data]);

  const handleSaveData = (data) => {
    const rowDataIndex = dataSource.findIndex((item) => item.id === data.id);
    const newDataSource = [...dataSource];
    newDataSource[rowDataIndex] = {
      ...data,
      shopCode1: data.shopCode1.value,
      shopCode2: data.shopCode2.value
    };
    setDataSource(newDataSource);
  };
  const shopOptions: IShop[] = (shopData.data || [])
    .filter((item) => item.shopCode !== 'Unassigned')
    .map((item) => {
      const shop: IShop = { value: item.shopCode, label: item.shopCode, color: item.shopColor };
      return shop;
    });

  console.log(shopOptions);

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
        <Spin spinning={data.loading || shopData.loading}>
          <div>
            {dataSource.map((data) => {
              return (
                <FormRowItem
                  key={data.id}
                  shopOptions={shopOptions}
                  initialValues={data}
                  onFinish={handleSaveData}
                />
              );
            })}
          </div>
        </Spin>
      </PageBody>
    </Card>
  );
}
