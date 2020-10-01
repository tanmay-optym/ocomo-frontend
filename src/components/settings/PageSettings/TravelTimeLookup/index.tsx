import React, { useState, useEffect } from 'react';
import FormRowItem from './FormRowItem';
import { Button } from '@material-ui/core';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import Card from '../../Card';
import CardBody from '../../CardBody';
import CardHeader from '../../CardHeader';
import { CSVLink } from 'react-csv';

type ITravelTimeLookup = {
  shop1: string;
  shop2: string;
  estimatedTravelTime: number;
};

export default function FormTravelTimeLookup(): React.FC {
  const [dataSource, setDataSource] = useState<ITravelTimeLookup[] | null>([]);
  const headersCSV = [
    { label: 'Shop 1', key: 'shop1' },
    { label: 'Shop 2', key: 'shop2' },
    { label: 'Estimated Travel Time', key: 'estimatedTravelTime' }
  ];
  useEffect(() => {
    const fakeData: IStandardWorkHours[] = [
      {
        shop1: 'SYM',
        shop2: 'MAC',
        estimatedTravelTime: 45
      },
      {
        shop1: 'SYM',
        shop2: 'TAS',
        estimatedTravelTime: 48
      },
      {
        shop1: 'KIR',
        shop2: 'PRG',
        estimatedTravelTime: 24
      },
      {
        shop1: 'KIR',
        shop2: 'THO',
        estimatedTravelTime: 36
      },
      {
        shop1: 'MEM',
        shop2: 'KIR',
        estimatedTravelTime: 42
      }
    ];
    setDataSource(fakeData);
  }, []);
  const handleSaveData = (data) => {
    console.log(data);
    const newDataSource = [...dataSource];
    newDataSource[data.dataIndex] = { ...data, shop1: data.shop1.value, shop2: data.shop2.value };
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
        <div>
          {dataSource.map((data, index) => {
            return (
              <FormRowItem
                key={data.key}
                initialValues={{ ...data, dataIndex: index }}
                onFinish={handleSaveData}
              />
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
}
