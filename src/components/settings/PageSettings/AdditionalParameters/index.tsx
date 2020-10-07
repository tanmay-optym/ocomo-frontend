import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import Card from '../../Card';
import CardBody from '../../CardBody';
import CardHeader from '../../CardHeader';
import BtnAddNewRow from '../../BtnAddNewRow';
import FormRowItem from './FormRowItem';
import FormRowContainer from '../../FormRowContainer';
import { CSVLink } from 'react-csv';
import { reducer, useThunkReducer } from '../../../../../pages/api/useThunkReducer';
import { fetchData } from '../../../../../pages/api/apiConstants';
import Spin from '../../Spin';

export type IAdditionalParameters = {
  code: string;
  description: string;
  value: string;
};

const AdditionalParameters = (): JSX.Element => {
  const [dataSource, setDataSource] = useState<IAdditionalParameters[]>([]);
  const [data, dispatchShopRequest] = useThunkReducer(reducer, {
    error: null,
    loading: false,
    data: []
  });
  console.log(data);
  useEffect(() => {
    dispatchShopRequest((e: Dispatch<SetPayloadActionType>) => fetchData(e, 'CONSTRAINTS_ADP', ''));
  }, []);

  const headersCSV = [
    { label: 'Name', key: 'description' },
    { label: 'Value', key: 'value' }
  ];

  useEffect(() => {
    setDataSource(data.data || []);
  }, [data]);

  const handleAddNewRow = () => {
    const newData: IAdditionalParameters = {
      code: new Date().getTime().toString(),
      description: '',
      value: ''
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
        title={'Additional Parameters'}
        rightAction={
          <CSVLink filename={'additional-parameters.csv'} data={dataSource} headers={headersCSV}>
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
              return (
                <FormRowItem
                  onFinish={handleSaveData}
                  initialValues={{ ...data }}
                  key={data.name}
                />
              );
            })}
            <FormRowContainer>
              <BtnAddNewRow onClick={handleAddNewRow} />
            </FormRowContainer>
          </div>
        </Spin>
      </CardBody>
    </Card>
  );
};

export default AdditionalParameters;
