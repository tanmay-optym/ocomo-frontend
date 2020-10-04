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

export type IAlertThresholds = {
  id: number;
  name: string;
  orangeAlert: string;
  redAlert: string;
};

export default function FormAlertThresholds(): JSX.Element {
  const [dataSource, setDataSource] = useState<IAlertThresholds[]>([]);
  const headersCSV = [
    { label: 'Name', key: 'name' },
    { label: 'Orange Alert', key: 'orangeAlert' },
    { label: 'Red Alert', key: 'redAlert' }
  ];
  useEffect(() => {
    const fakeData: IAlertThresholds[] = [
      {
        id: 1,
        name: 'Total working hours in a shop in a day',
        orangeAlert: '400',
        redAlert: '600'
      },
      {
        id: 2,
        name: 'Total out-of-service hours of locomotives in a shop',
        orangeAlert: '400',
        redAlert: '600'
      },
      {
        id: 3,
        name: 'Unplanned work percentage of a shop',
        orangeAlert: '60%',
        redAlert: '80%'
      },
      {
        id: 4,
        name: 'Deviation from the planned release in a day',
        orangeAlert: '-3',
        redAlert: '-5'
      }
    ];
    setDataSource(fakeData);
  }, []);

  const handleAddNewRow = () => {
    const newData: IAlertThresholds = {
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
        title={'Alert Thresholds'}
        rightAction={
          <CSVLink filename={'alert-thresholds.csv'} data={dataSource} headers={headersCSV}>
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
