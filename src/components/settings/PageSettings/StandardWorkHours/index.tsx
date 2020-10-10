import React, { useState, useEffect } from 'react';
import FormRowContainer from '../../FormRowContainer';
import BtnAddNewRow from '../../BtnAddNewRow';
import FormRowItem from './FormRowItem';
import { Button } from '@material-ui/core';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import Card from '../../Card';
import CardHeader from '../../CardHeader';
import { CSVLink } from 'react-csv';
import { reducer, useThunkReducer } from '../../../../../pages/api/useThunkReducer';
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
    { label: 'Min Hour', key: 'minorStopStdHrs' }
  ];
  const [data, dispatchRequest] = useThunkReducer(reducer, {
    error: null,
    loading: false,
    data: []
  });

  useEffect(() => {
    dispatchRequest((e) => fetchData(e, 'CONSTRAINTS_SWH', ''));
  }, []);

  useEffect(() => {
    setDataSource(data.data || []);
  }, [data]);

  const handleAddNewRow = () => {
    const newData: IStandardWorkHours = {
      code: parseInt(new Date().getTime() / 1000).toString(),
      description: '',
      severityLevel: '',
      majorStopStdHrs: undefined,
      minorStopStdHrs: undefined,
      isNew: true
    };
    setDataSource([...dataSource, newData]);
  };

  const handleSaveData = (data, index) => {
    // const rowDataIndex = dataSource.findIndex((item) => item.code === data.code);
    const newDataSource = [...dataSource];
    newDataSource[index] = data;
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
            {dataSource.map((data, index) => {
              return (
                <FormRowItem
                  onFinish={handleSaveData}
                  initialValues={{ ...data }}
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
