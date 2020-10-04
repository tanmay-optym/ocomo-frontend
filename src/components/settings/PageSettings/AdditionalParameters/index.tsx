import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import Card from '../../Card';
import CardBody from '../../CardBody';
import CardHeader from '../../CardHeader';
import BtnAddNewRow from '../../BtnAddNewRow';
import FormRowItem from './FormRowItem';
import FormRowContainer from '../../FormRowContainer';
import { CSVLink } from 'react-csv';

export type IAdditionalParameters = {
  id: number;
  name: string;
  value: string;
};

const AdditionalParameters = (): JSX.Element => {
  const [dataSource, setDataSource] = useState<IAdditionalParameters[]>([]);
  const headersCSV = [
    { label: 'Name', key: 'name' },
    { label: 'Value', key: 'value' }
  ];
  useEffect(() => {
    const fakeData: IAdditionalParameters[] = [
      {
        id: 1,
        name: 'Apprentice Adjustment Percentage',
        value: '40'
      },
      {
        id: 2,
        name: 'Temporary Productivity Adjustment Percentage',
        value: '30'
      },
      {
        id: 3,
        name: 'Maximum Overtime Percentage',
        value: '25'
      },
      {
        id: 4,
        name: 'Overtime Utilization Threshold',
        value: '58'
      }
    ];
    setDataSource(fakeData);
  }, []);

  const handleAddNewRow = () => {
    const newData: IAdditionalParameters = {
      id: new Date().getTime(),
      name: '',
      value: ''
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
        title={'Additional Parameters'}
        rightAction={
          <CSVLink filename={'additional-parameters.csv'} data={dataSource} headers={headersCSV}>
            <Button>
              <GetAppOutlinedIcon />
            </Button>
          </CSVLink>
        }
      />
      <CardBody>
        <div>
          {dataSource.map((data) => {
            return (
              <FormRowItem onFinish={handleSaveData} initialValues={{ ...data }} key={data.name} />
            );
          })}
          <FormRowContainer>
            <BtnAddNewRow onClick={handleAddNewRow} />
          </FormRowContainer>
        </div>
      </CardBody>
    </Card>
  );
};

export default AdditionalParameters;
