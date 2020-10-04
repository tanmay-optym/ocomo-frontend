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

export type IStandardWorkHours = {
  id: number;
  name: string;
  severityLevel: string;
  maxHour: number | undefined;
  minHour: number | undefined;
};

export default function FormStandardWorkHours(): JSX.Element {
  const [dataSource, setDataSource] = useState<IStandardWorkHours[]>([]);
  const headersCSV = [
    { label: 'Name', key: 'name' },
    { label: 'Severity Level', key: 'severityLevel' },
    { label: 'Max Hour', key: 'maxHour' },
    { label: 'Min Hour', key: 'minHour' }
  ];
  useEffect(() => {
    const fakeData: IStandardWorkHours[] = [
      {
        id: 1,
        name: 'Engine Replacement',
        severityLevel: 'High',
        maxHour: 12,
        minHour: 30
      }
    ];
    setDataSource(fakeData);
  }, []);

  const handleAddNewRow = () => {
    const newData: IStandardWorkHours = {
      id: new Date().getTime(),
      name: '',
      severityLevel: '',
      maxHour: undefined,
      minHour: undefined
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
          {dataSource.map((data) => {
            return (
              <FormRowItem onFinish={handleSaveData} initialValues={{ ...data }} key={data.id} />
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
