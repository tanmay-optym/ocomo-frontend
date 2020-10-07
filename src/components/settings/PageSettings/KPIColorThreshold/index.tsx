import React, { useState, useEffect } from 'react';
import FormRowItem from './FormRowItem';
import BtnAddNewRow from '../../BtnAddNewRow';
import FormRowContainer from '../../FormRowContainer';
import { Button } from '@material-ui/core';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import Card from '../../Card';
import CardBody from '../../CardBody';
import CardHeader from '../../CardHeader';
import { CSVLink } from 'react-csv';
import { reducer, useThunkReducer } from '../../../../../pages/api/useThunkReducer';
import { fetchData } from '../../../../../pages/api/apiConstants';
import Spin from '../../Spin';

export type IKPIColorThreshold = {
  code: string;
  description: string;
  orangeKpi: string;
  redKpi: string;
};

export default function FormKPIColorThreshold(): JSX.Element {
  const [dataSource, setDataSource] = useState<IKPIColorThreshold[]>([]);
  const [data, dispatchShopRequest] = useThunkReducer(reducer, {
    error: null,
    loading: false,
    data: []
  });
  console.log(data);
  useEffect(() => {
    dispatchShopRequest((e: Dispatch<SetPayloadActionType>) => fetchData(e, 'UI_SETTINGS_KPI', ''));
  }, []);
  const headersCSV = [
    { label: 'Name', key: 'description' },
    { label: 'Orange Alert', key: 'orangeKpi' },
    { label: 'Red Alert', key: 'redKpi' }
  ];

  useEffect(() => {
    setDataSource(data.data || []);
  }, [data]);

  const handleAddNewRow = () => {
    const newData = {
      code: new Date().getTime().toString(),
      description: '',
      orangeKpi: '',
      redAlertKpi: ''
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
        title={'KPI Color Threshold'}
        rightAction={
          <CSVLink filename={'kpi-color-threshold.csv'} data={dataSource} headers={headersCSV}>
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
              return <FormRowItem onFinish={handleSaveData} initialValues={data} key={data.code} />;
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
