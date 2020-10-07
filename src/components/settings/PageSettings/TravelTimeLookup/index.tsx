import React, { useState, useEffect } from 'react';
import FormRowItem from './FormRowItem';
import { Button } from '@material-ui/core';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import Card from '../../Card';
import CardBody from '../../CardBody';
import CardHeader from '../../CardHeader';
import { CSVLink } from 'react-csv';
import { reducer, useThunkReducer } from '../../../../../pages/api/useThunkReducer';
import { fetchData } from '../../../../../pages/api/apiConstants';
import Spin from '../../Spin';

export type ITravelTimeLookup = {
  id: number;
  shop1: string;
  shop2: string;
  estimatedTravelTime: number;
};

export default function FormTravelTimeLookup(): JSX.Element {
  const [dataSource, setDataSource] = useState<ITravelTimeLookup[]>([]);
  const headersCSV = [
    { label: 'Shop 1', key: 'shop1' },
    { label: 'Shop 2', key: 'shop2' },
    { label: 'Estimated Travel Time', key: 'estimatedTravelTime' }
  ];
  const [data, dispatchShopRequest] = useThunkReducer(reducer, {
    error: null,
    loading: false,
    data: []
  });
  console.log(data);
  useEffect(() => {
    dispatchShopRequest((e: Dispatch<SetPayloadActionType>) => fetchData(e, 'CONSTRAINTS_TTL', ''));
  }, []);
  useEffect(() => {
    const fakeData: ITravelTimeLookup[] = [
      {
        id: 1,
        shop1: 'SYM',
        shop2: 'MAC',
        estimatedTravelTime: 45
      },
      {
        id: 2,
        shop1: 'SYM',
        shop2: 'TAS',
        estimatedTravelTime: 48
      },
      {
        id: 3,
        shop1: 'KIR',
        shop2: 'PRG',
        estimatedTravelTime: 24
      },
      {
        id: 4,
        shop1: 'KIR',
        shop2: 'THO',
        estimatedTravelTime: 36
      },
      {
        id: 5,
        shop1: 'MEM',
        shop2: 'KIR',
        estimatedTravelTime: 42
      }
    ];
    setDataSource(fakeData);
  }, []);

  const handleSaveData = (data) => {
    const rowDataIndex = dataSource.findIndex((item) => item.id === data.id);
    const newDataSource = [...dataSource];
    newDataSource[rowDataIndex] = { ...data, shop1: data.shop1.value, shop2: data.shop2.value };
    setDataSource(newDataSource);
  };

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
      <CardBody>
        <Spin spinning={data.loading}>
          <div>
            {dataSource.map((data) => {
              return <FormRowItem key={data.id} initialValues={data} onFinish={handleSaveData} />;
            })}
          </div>
        </Spin>
      </CardBody>
    </Card>
  );
}
