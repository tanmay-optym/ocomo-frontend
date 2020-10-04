import React, { useState, useEffect } from 'react';
import FormRowItem from './FormRowItem';
import BtnAddNewRow from '../../BtnAddNewRow';
import FormRowContainer from '../../FormRowContainer';
import { Button } from '@material-ui/core';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import Card from '../../Card';
import CardBody from '../../CardBody';
import CardHeader from '../../CardHeader';
import { CSVLink } from 'react-csv';

export type IKPIColorThreshold = {
  id: number;
  name: string;
  orangeAlert: string;
  redAlert: string;
};

export default function FormKPIColorThreshold(): JSX.Element {
  const [dataSource, setDataSource] = useState<IKPIColorThreshold[]>([]);

  const headersCSV = [
    { label: 'Name', key: 'name' },
    { label: 'Orange Alert', key: 'orangeAlert' },
    { label: 'Red Alert', key: 'redAlert' }
  ];

  useEffect(() => {
    const fakeData: IKPIColorThreshold[] = [
      {
        id: 1,
        name: 'Bad Order %',
        orangeAlert: '14%',
        redAlert: '15%'
      },
      {
        id: 2,
        name: 'Overtime Hours',
        orangeAlert: '400',
        redAlert: '600'
      },
      {
        id: 3,
        name: 'Unplanned %',
        orangeAlert: '50%',
        redAlert: '80%'
      },
      {
        id: 4,
        name: 'Loco Release per Day',
        orangeAlert: '-20',
        redAlert: '10'
      }
    ];
    setDataSource(fakeData);
  }, []);

  const handleAddNewRow = () => {
    const newData = {
      id: new Date().getTime(),
      name: '',
      orangeAlert: '',
      redAlert: ''
    };
    setDataSource([...dataSource, newData]);
  };

  const handleSaveData = (data) => {
    const rowDataIndex = dataSource.findIndex((item) => item.id === data.id);
    const newDataSource = [...dataSource];
    newDataSource[rowDataIndex] = data;
    setDataSource(newDataSource);
  };

  return (
    <Card>
      <CardHeader
        title={'KPI Color Threshold'}
        rightAction={
          <CSVLink filename={'kpi-color-threshold.csv'} data={dataSource} headers={headersCSV}>
            <Button>
              <GetAppOutlinedIcon />
            </Button>
          </CSVLink>
        }
      />
      <CardBody>
        <div>
          {dataSource.map((data) => {
            return <FormRowItem onFinish={handleSaveData} initialValues={data} key={data.id} />;
          })}
          <FormRowContainer>
            <BtnAddNewRow onClick={handleAddNewRow} />
          </FormRowContainer>
        </div>
      </CardBody>
    </Card>
  );
}
