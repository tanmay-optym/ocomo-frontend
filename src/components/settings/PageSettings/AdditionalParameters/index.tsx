import React, { useState, useEffect, Dispatch } from 'react';
import { Button } from '@material-ui/core';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import { CSVLink } from 'react-csv';
import Card from '../../Card';
import CardHeader from '../../CardHeader';
import BtnAddNewRow from '../../BtnAddNewRow';
import FormRowItem from './FormRowItem';
import FormRowContainer from '../../FormRowContainer';

import {
  reducer,
  SetPayloadActionType,
  useThunkReducer,
} from '../../../../api/useThunkReducer';
import { fetchData } from '../../../../api/apiConstants';
import Spin from '../../Spin';
import PageBody from '../../PageBody';

export type IAdditionalParameters = {
  code: string;
  description: string;
  value: string;
  isNew?: boolean;
};

const AdditionalParameters = (): JSX.Element => {
  const [dataSource, setDataSource] = useState<IAdditionalParameters[]>([]);
  const [data, dispatchRequest] = useThunkReducer(reducer, {
    error: null,
    loading: false,
    data: [],
  });
  useEffect(() => {
    dispatchRequest((e: Dispatch<SetPayloadActionType>) => fetchData(e, 'CONSTRAINTS_ADP', ''));
  }, []);

  const headersCSV = [
    { label: 'Name', key: 'description' },
    { label: 'Value', key: 'value' },
  ];

  useEffect(() => {
    setDataSource(data.data || []);
  }, [data]);

  const handleAddNewRow = () => {
    const newData: IAdditionalParameters = {
      code: Math.round(new Date().getTime() / 1000).toString(),
      description: '',
      value: '',
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
        title="Additional Parameters"
        rightAction={
          <CSVLink filename="additional-parameters.csv" data={dataSource} headers={headersCSV}>
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
};

export default AdditionalParameters;
