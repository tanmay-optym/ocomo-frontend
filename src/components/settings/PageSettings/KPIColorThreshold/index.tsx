import React, { useState, useEffect, Dispatch } from 'react';
import { Button } from '@material-ui/core';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import { CSVLink } from 'react-csv';
import FormRowItem from './FormRowItem';
import BtnAddNewRow from '../../BtnAddNewRow';
import FormRowContainer from '../../FormRowContainer';

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

export type IKPIColorThreshold = {
  code: string;
  description: string;
  orangeKpi: string;
  redKpi: string;
  isNew?: boolean;
};

export default function FormKPIColorThreshold(): JSX.Element {
  const [dataSource, setDataSource] = useState<IKPIColorThreshold[]>([]);
  const [data, dispatchRequest] = useThunkReducer(reducer, {
    error: null,
    loading: false,
    data: [],
  });
  useEffect(() => {
    dispatchRequest((e: Dispatch<SetPayloadActionType>) => fetchData(e, 'UI_SETTINGS_KPI', ''));
  }, []);
  const headersCSV = [
    { label: 'Name', key: 'description' },
    { label: 'Orange Alert', key: 'orangeKpi' },
    { label: 'Red Alert', key: 'redKpi' },
  ];

  useEffect(() => {
    setDataSource(data.data || []);
  }, [data]);

  const handleAddNewRow = () => {
    const newData = {
      code: Math.round(new Date().getTime() / 1000).toString(),
      description: '',
      orangeKpi: '',
      redKpi: '',
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
        title={'KPI Color Threshold'}
        rightAction={
          <CSVLink filename={'kpi-color-threshold.csv'} data={dataSource} headers={headersCSV}>
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
                  initialValues={dataItem}
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
