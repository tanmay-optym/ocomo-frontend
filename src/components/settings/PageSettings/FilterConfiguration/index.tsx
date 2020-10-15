import React, { useState, useEffect, Dispatch } from 'react';
import { Button } from '@material-ui/core';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import { CSVLink } from 'react-csv';
import BtnAddNewRow from '../../BtnAddNewRow';
import FormRowItem from './FormRowItem';
import FormRowContainer from '../../FormRowContainer';
import Card from '../../Card';
import CardHeader from '../../CardHeader';

import { fetchData } from '../../../../api/apiConstants';
import {
  reducer,
  SetPayloadActionType,
  useThunkReducer,
} from '../../../../api/useThunkReducer';
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
    data: [],
  });
  useEffect(() => {
    dispatchRequest((e: Dispatch<SetPayloadActionType>) => fetchData(e, 'UI_SETTINGS_FILTER', ''));
  }, []);
  const headersCSV = [
    { label: 'Name', key: 'description' },
    { label: 'Value', key: 'value' },
  ];
  useEffect(() => {
    setDataSource(data.data || []);
  }, [data]);

  const handleAddNewRow = () => {
    const newData: IFilterConfiguration = {
      code: Math.round(new Date().getTime() / 1000).toString(),
      description: '',
      value: false,
      isNew: true,
    };
    setDataSource([...dataSource, newData]);
  };

  const handleSaveData = (resData: any) => {
    const rowDataIndex = dataSource.findIndex((item) => item.code === resData.code);
    const newDataSource = [...dataSource];
    newDataSource[rowDataIndex] = resData;
    setDataSource(newDataSource);
  };

  const handleRemoveData = (code: string): void => {
    const newDataSource = dataSource.filter((dataItem) => dataItem.code !== code);
    setDataSource(newDataSource);
  };
  return (
    <Card>
      <CardHeader
        title={'Filter Configuration'}
        rightAction={
          <CSVLink
            filename={'filter-configuration.csv'}
            data={dataSource?.map((dataItem) => ({
              ...dataItem,
              value: dataItem.value ? 'Enabled' : 'Disable',
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
            {dataSource.map((dataItem, index) => {
              return (
                <FormRowItem
                  onFinish={handleSaveData}
                  initialValues={dataItem}
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
