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

export type IAlertThresholds = {
  code: string;
  description: string;
  orangeAlert: string;
  redAlert: string;
};

export default function FormAlertThresholds(): JSX.Element {
  const [dataSource, setDataSource] = useState<IAlertThresholds[]>([]);
  const [data, dispatchRequest] = useThunkReducer(reducer, {
    error: null,
    loading: false,
    data: []
  });
  console.log(data);
  useEffect(() => {
    dispatchRequest((e) => fetchData(e, 'UI_SETTINGS_ADP', ''));
  }, []);
  const headersCSV = [
    { label: 'Name', key: 'description' },
    { label: 'Orange Alert', key: 'orangeAlert' },
    { label: 'Red Alert', key: 'redAlert' }
  ];
  useEffect(() => {
    setDataSource(data.data || []);
  }, [data]);

  const handleAddNewRow = () => {
    const newData: IAlertThresholds = {
      code: new Date().getTime().toString(),
      description: '',
      orangeAlert: '',
      redAlert: ''
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
        title={'Alert Thresholds'}
        rightAction={
          <CSVLink filename={'alert-thresholds.csv'} data={dataSource} headers={headersCSV}>
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
