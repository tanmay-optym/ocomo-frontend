import React, { useState, useEffect, Dispatch } from 'react';
import { Button } from '@material-ui/core';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import { CSVLink } from 'react-csv';
// import FormRowContainer from '../../FormRowContainer';
// import BtnAddNewRow from '../../BtnAddNewRow';
// import FormRowItem from './FormRowItem';
import Card from '../../Card';
import CardHeader from '../../CardHeader';

import { reducer, SetPayloadActionType, useThunkReducer } from '../../../../api/useThunkReducer';
import { fetchData } from '../../../../api/apiConstants';
import Spin from '../../Spin';
import PageBody from '../../PageBody';
import TableData from '../TableData';

export type IStandardWorkHours = {
  code: string;
  description: string;
  severityLevel: string;
  majorStopStdHrs: number | undefined;
  minorStopStdHrs: number | undefined;
  isNew?: boolean;
};

const columns = [
  { title: 'Inspection / Defect Type', dataIndex: 'description', editable: true, require: true },
  { title: 'Severity Level', dataIndex: 'severityLevel', editable: true, require: true },
  {
    title: 'Major Shop Std. Hours',
    dataIndex: 'majorStopStdHrs',
    editable: true,
    require: true,
    registerOption: {
      pattern: {
        value: /^[0-9]*[0-9]$/,
        message: 'Invalid',
      },
    },
  },
  {
    title: 'Minor Shop Std. Hours',
    dataIndex: 'minorStopStdHrs',
    editable: true,
    require: true,
    registerOption: {
      pattern: {
        value: /^[0-9]*[0-9]$/,
        message: 'Invalid',
      },
    },
  },
];

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

  const handleSaveData = (resData: any, index: number) => {
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
          <TableData
            initialData={dataSource}
            columns={columns}
            onFinish={handleSaveData}
            queryString={'CONSTRAINTS_SWH'}
            pathVariableKey={'code'}
          />
        </Spin>
      </PageBody>
    </Card>
  );
}
