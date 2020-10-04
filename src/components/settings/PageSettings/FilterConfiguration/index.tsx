import React, { useState, useEffect } from 'react';
import BtnAddNewRow from '../../BtnAddNewRow';
import FormRowItem from './FormRowItem';
import FormRowContainer from '../../FormRowContainer';
import { Button } from '@material-ui/core';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import Card from '../../Card';
import CardBody from '../../CardBody';
import CardHeader from '../../CardHeader';
import { CSVLink } from 'react-csv';

export type IFilterConfiguration = {
  id: number;
  name: string;
  value: boolean;
};

export default function FormFilterConfiguration(): JSX.Element {
  const [dataSource, setDataSource] = useState<IFilterConfiguration[]>([]);
  const headersCSV = [
    { label: 'Name', key: 'name' },
    { label: 'Value', key: 'value' }
  ];
  useEffect(() => {
    const fakeData: IFilterConfiguration[] = [
      {
        id: 1,
        name: 'Loco Type',
        value: true
      },
      {
        id: 2,
        name: 'Maintenance',
        value: true
      },
      {
        id: 3,
        name: 'Due Date',
        value: false
      },
      {
        id: 4,
        name: 'Maint Type',
        value: true
      },
      {
        id: 5,
        name: 'Shop',
        value: false
      },
      {
        id: 6,
        name: 'Priority',
        value: false
      },
      {
        id: 7,
        name: 'Loco Status',
        value: true
      }
    ];
    setDataSource(fakeData);
  }, []);

  const handleAddNewRow = () => {
    const newData: IFilterConfiguration = {
      id: new Date().getTime(),
      name: '',
      value: false
    };
    setDataSource([...dataSource, newData]);
  };

  const handleSaveData = (data) => {
    const rowDataIndex = dataSource.findIndex((item) => item.id === data.id);
    const newDataSource = [...dataSource];
    newDataSource[rowDataIndex] = data;
    setDataSource(newDataSource);
  };

  const handleRemoveData = (id: number): void => {
    const newDataSource = dataSource.filter((data) => data.id !== id);
    setDataSource(newDataSource);
  };
  return (
    <Card>
      <CardHeader
        title={'Filter Configuration'}
        rightAction={
          <CSVLink
            filename={'filter-configuration.csv'}
            data={dataSource?.map((data) => ({
              ...data,
              value: data.value ? 'Enabled' : 'Disbaled'
            }))}
            headers={headersCSV}>
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
              <FormRowItem
                onFinish={handleSaveData}
                initialValues={data}
                key={data.id}
                onRemove={handleRemoveData}
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
