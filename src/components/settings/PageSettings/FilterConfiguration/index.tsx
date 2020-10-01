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

type IAdditionalParameters = {
  shop1Name: string;
  shop2Name: string;
  estimatedTravelTime: number;
};

export default function FormAdditionalParameters(): React.FC {
  const [dataSource, setDataSource] = useState<IAdditionalParameters[] | null>([]);
  const headersCSV = [
    { label: 'Name', key: 'name' },
    { label: 'Value', key: 'value' }
  ];
  useEffect(() => {
    const fakeData: IAdditionalParameters[] = [
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
    newDataSource[data.dataIndex] = { ...data, id: new Date().getTime() };
    setDataSource(newDataSource);
  };

  const handleRemoveData = ({ id }) => {
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
          {dataSource.map((data, index) => {
            return (
              <FormRowItem
                onFinish={handleSaveData}
                initialValues={{ ...data, dataIndex: index }}
                key={data.title}
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
