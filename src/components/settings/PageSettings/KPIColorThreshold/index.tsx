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

type IAlertThresholds = {
  name: string;
  orangeAlert: string;
  redAlert: string;
};

export default function FormKPIColorThreshold(): React.FC {
  const [dataSource, setDataSource] = useState<IAlertThresholds[] | null>([]);

  const headersCSV = [
    { label: 'Name', key: 'name' },
    { label: 'Orange Alert', key: 'orangeAlert' },
    { label: 'Red Alert', key: 'redAlert' }
  ];

  useEffect(() => {
    const fakeData: IAlertThresholds[] = [
      {
        name: 'Bad Order %',
        orangeAlert: '14%',
        redAlert: '15%'
      },
      {
        name: 'Overtime Hours',
        orangeAlert: '400',
        redAlert: '600'
      },
      {
        name: 'Unplanned %',
        orangeAlert: '50%',
        redAlert: '80%'
      },
      {
        name: 'Loco Release per Day',
        orangeAlert: '-20',
        redAlert: '10'
      }
    ];
    setDataSource(fakeData);
  }, []);

  const handleAddNewRow = () => {
    setDataSource([
      ...dataSource,
      {
        name: '',
        value: ''
      }
    ]);
  };

  const handleSaveData = (data) => {
    const newDataSource = [...dataSource];
    newDataSource[data.dataIndex] = data;
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
          {dataSource.map((data, index) => {
            return (
              <FormRowItem
                onFinish={handleSaveData}
                initialValues={{ ...data, dataIndex: index }}
                key={data.title}
              />
            );
          })}
          <FormRowContainer>
            <BtnAddNewRow onClick={handleAddNewRow} />
          </FormRowContainer>
        </div>
      </CardBody>
    </Card>
  );
}
