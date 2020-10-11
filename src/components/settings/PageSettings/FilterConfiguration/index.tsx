import React, { useState, useEffect, Dispatch } from 'react';
import BtnAddNewRow from '../../BtnAddNewRow';
import FormRowItem from './FormRowItem';
import FormRowContainer from '../../FormRowContainer';
import { Button } from '@material-ui/core';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import Card from '../../Card';
import CardHeader from '../../CardHeader';
import { CSVLink } from 'react-csv';
import { fetchData } from '../../../../../pages/api/apiConstants';
import {
  reducer,
  SetPayloadActionType,
  useThunkReducer
} from '../../../../../pages/api/useThunkReducer';
import Spin from '../../Spin';
import PageBody from '../../PageBody';

export type IFilterConfiguration = {
  code: string;
  description: string;
  value: boolean;
  isNew?: boolean;
};

export default function FormFilterConfiguration(): JSX.Element {
  const [dataSource, setDataSource] = useState<IFilterConfiguration[]>([]);
  const [data, dispatchRequest] = useThunkReducer(reducer, {
    error: null,
    loading: false,
    data: []
  });
  useEffect(() => {
    dispatchRequest((e: Dispatch<SetPayloadActionType>) => fetchData(e, 'UI_SETTINGS_FILTER', ''));
  }, []);
  const headersCSV = [
    { label: 'Name', key: 'description' },
    { label: 'Value', key: 'value' }
  ];
  useEffect(() => {
    setDataSource(data.data || []);
  }, [data]);

  const handleAddNewRow = () => {
    const newData: IFilterConfiguration = {
      code: Math.round(new Date().getTime() / 1000).toString(),
      description: '',
      value: false,
      isNew: true
    };
    setDataSource([...dataSource, newData]);
  };

  const handleSaveData = (data: any) => {
    const rowDataIndex = dataSource.findIndex((item) => item.code === data.code);
    const newDataSource = [...dataSource];
    newDataSource[rowDataIndex] = data;
    setDataSource(newDataSource);
  };

  const handleRemoveData = (code: string): void => {
    const newDataSource = dataSource.filter((data) => data.code !== code);
    setDataSource(newDataSource);
  };
  return (
    <Card>
      <CardHeader
        title={'Filter Configuration'}
        rightAction={
          <CSVLink
            filename={'filter-configuration.csv'}
            data={dataSource?.map((data) => ({
              ...data,
              value: data.value ? 'Enabled' : 'Disable'
            }))}
            headers={headersCSV}>
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
                  initialValues={data}
                  key={index.toString()}
                  onRemove={handleRemoveData}
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
