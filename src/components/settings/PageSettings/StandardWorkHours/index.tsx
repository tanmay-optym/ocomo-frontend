import React, { useState, useEffect } from 'react';
import FormRowContainer from '../../FormRowContainer';
import BtnAddNewRow from '../../BtnAddNewRow';
import FormRowItem from './FormRowItem';
import { Button } from '@material-ui/core';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import Card from '../../Card';
import CardBody from '../../CardBody';
import CardHeader from '../../CardHeader';
import { CSVLink } from 'react-csv';

type IStandardWorkHours = {
  type: string;
  severityLevel: string;
  maxHour: number;
  minHour: number;
};

export default function FormStandardWorkHours(): React.FC {
  const [dataSource, setDataSource] = useState<IStandardWorkHours[] | null>([]);
  const headersCSV = [
    { label: 'Name', key: 'name' },
    { label: 'Severity Level', key: 'severityLevel' },
    { label: 'Max Hour', key: 'maxHour' },
    { label: 'Min Hour', key: 'minHour' }
  ];
  useEffect(() => {
    const fakeData: IStandardWorkHours[] = [
      {
        name: 'Engine Replacement',
        severityLevel: 'High',
        maxHour: 12,
        minHour: 30
      }
    ];
    setDataSource(fakeData);
  }, []);

  const handleAddNewRow = () => {
    setDataSource([
      ...dataSource,
      {
        name: '',
        severityLevel: '',
        maxHour: '',
        minHour: ''
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
        title={'Standard Work Hours'}
        rightAction={
          <CSVLink filename={'standard-work-hours.csv'} data={dataSource} headers={headersCSV}>
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
