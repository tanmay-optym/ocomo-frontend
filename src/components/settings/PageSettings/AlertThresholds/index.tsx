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
} from '../../../../api/useThunkReducer';
import { fetchData } from '../../../../api/apiConstants';
import Spin from '../../Spin';
import PageBody from '../../PageBody';

export type IAlertThresholds = {
  code: string;
  description: string;
  orangeAlert: string;
  redAlert: string;
  isNew?: boolean;
};

export default function FormAlertThresholds(): JSX.Element {
  const [dataSource, setDataSource] = useState<IAlertThresholds[]>([]);
  const [data, dispatchRequest] = useThunkReducer(reducer, {
    error: null,
    loading: false,
    data: [],
  });

  useEffect(() => {
    dispatchRequest((e: Dispatch<SetPayloadActionType>) => fetchData(e, 'UI_SETTINGS_ADP', ''));
  }, []);

  const headersCSV = [
    { label: 'Name', key: 'description' },
    { label: 'Orange Alert', key: 'orangeAlert' },
    { label: 'Red Alert', key: 'redAlert' },
  ];
  useEffect(() => {
    setDataSource(data.data || []);
  }, [data]);

  const handleAddNewRow = () => {
    const newData: IAlertThresholds = {
      code: Math.round(new Date().getTime() / 1000).toString(),
      description: '',
      orangeAlert: '',
      redAlert: '',
      isNew: true,
    };
    setDataSource([...dataSource, newData]);
  };

  const handleSaveData = (resData: any, index: number) => {
    const newDataSource = [...dataSource];
    newDataSource[index] = resData;
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
