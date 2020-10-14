import React, { useState, useEffect, Dispatch } from 'react';
import { Button } from '@material-ui/core';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import { CSVLink } from 'react-csv';
import FormRowContainer from '../../FormRowContainer';
import BtnAddNewRow from '../../BtnAddNewRow';
import FormRowItem from './FormRowItem';
import Card from '../../Card';
import CardHeader from '../../CardHeader';

import {
  reducer,
  SetPayloadActionType,
  useThunkReducer,
} from '../../../../../pages/api/useThunkReducer';
import { fetchData } from '../../../../../pages/api/apiConstants';
import Spin from '../../Spin';
import PageBody from '../../PageBody';

export type IStandardWorkHours = {
  code: string;
  description: string;
  severityLevel: string;
  majorStopStdHrs: number | undefined;
  minorStopStdHrs: number | undefined;
  isNew?: boolean;
};

export default function FormStandardWorkHours(): JSX.Element {
  const [dataSource, setDataSource] = useState<IStandardWorkHours[]>([]);
  const headersCSV = [
    { label: 'Name', key: 'description' },
    { label: 'Severity Level', key: 'severityLevel' },
    { label: 'Max Hour', key: 'majorStopStdHrs' },
    { label: 'Min Hour', key: 'minorStopStdHrs' },
  ];
  const [data, dispatchRequest] = useThunkReducer(reducer, {
    error: null,
    loading: false,
    data: [],
  });

  useEffect(() => {
    dispatchRequest((e: Dispatch<SetPayloadActionType>) => fetchData(e, 'CONSTRAINTS_SWH', ''));
  }, []);

  useEffect(() => {
    setDataSource(data.data || []);
  }, [data]);

  const handleAddNewRow = () => {
    const newData: IStandardWorkHours = {
      code: Math.round(new Date().getTime() / 1000).toString(),
      description: '',
      severityLevel: '',
      majorStopStdHrs: undefined,
      minorStopStdHrs: undefined,
      isNew: true,
    };
    setDataSource([...dataSource, newData]);
  };

  const handleSaveData = (resData: any, index: number) => {
    // const rowDataIndex = dataSource.findIndex((item) => item.code === data.code);
    const newDataSource = [...dataSource];
    newDataSource[index] = resData;
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
      <PageBody>
        <Spin spinning={data.loading}>
          <div>
            {dataSource.map((dataItem, index) => {
              return (
                <FormRowItem
                  onFinish={handleSaveData}
                  initialValues={{ ...dataItem }}
                  key={index.toString()}
                  index={index}
                />
              );
            })}
            <FormRowContainer>
              <BtnAddNewRow onClick={handleAddNewRow} />
            </FormRowContainer>
          </div>
        </Spin>
      </PageBody>
    </Card>
  );
}
