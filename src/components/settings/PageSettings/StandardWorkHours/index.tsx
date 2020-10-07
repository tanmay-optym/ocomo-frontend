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
import { reducer, useThunkReducer } from '../../../../../pages/api/useThunkReducer';
import { fetchData } from '../../../../../pages/api/apiConstants';
import Spin from '../../Spin';

export type IStandardWorkHours = {
  code: string;
  description: string;
  severityLevel: string;
  majorStopStdHrs: number | undefined;
  minorStopStdHrs: number | undefined;
};

export default function FormStandardWorkHours(): JSX.Element {
  const [dataSource, setDataSource] = useState<IStandardWorkHours[]>([]);
  const headersCSV = [
    { label: 'Name', key: 'description' },
    { label: 'Severity Level', key: 'severityLevel' },
    { label: 'Max Hour', key: 'majorStopStdHrs' },
    { label: 'Min Hour', key: 'minorStopStdHrs' }
  ];
  const [data, dispatchShopRequest] = useThunkReducer(reducer, {
    error: null,
    loading: false,
    data: []
  });
  console.log(data);
  useEffect(() => {
    dispatchShopRequest((e: Dispatch<SetPayloadActionType>) => fetchData(e, 'CONSTRAINTS_SWH', ''));
  }, []);

  useEffect(() => {
    setDataSource(data.data || []);
  }, [data]);

  const handleAddNewRow = () => {
    const newData: IStandardWorkHours = {
      code: new Date().getTime() + '',
      description: '',
      severityLevel: '',
      majorStopStdHrs: undefined,
      minorStopStdHrs: undefined
    };
    setDataSource([...dataSource, newData]);
  };

  const handleSaveData = (data) => {
    const rowDataIndex = dataSource.findIndex((item) => item.code === data.code);
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
        <Spin spinning={data.loading}>
          <div>
            {dataSource.map((data) => {
              return (
                <FormRowItem
                  onFinish={handleSaveData}
                  initialValues={{ ...data }}
                  key={data.code}
                />
              );
            })}
            <FormRowContainer>
              <BtnAddNewRow onClick={handleAddNewRow} />
            </FormRowContainer>
          </div>
        </Spin>
      </CardBody>
    </Card>
  );
}
