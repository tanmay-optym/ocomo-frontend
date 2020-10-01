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

type IAdditionalParameters = {
  shop1Name: string;
  shop2Name: string;
  estimatedTravelTime: number;
};

const AdditionalParameters = (): React.FC => {
  const [dataSource, setDataSource] = useState<IAdditionalParameters[] | null>([]);
  const headersCSV = [
    { label: 'Name', key: 'name' },
    { label: 'Value', key: 'value' }
  ];
  useEffect(() => {
    const fakeData: IAdditionalParameters[] = [
      {
        name: 'Apprentice Adjustment Percentage',
        value: '40'
      },
      {
        name: 'Temporary Productivity Adjustment Percentage',
        value: '30'
      },
      {
        name: 'Maximum Overtime Percentage',
        value: '25'
      },
      {
        name: 'Overtime Utilization Threshold',
        value: '58'
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
};

export default AdditionalParameters;
