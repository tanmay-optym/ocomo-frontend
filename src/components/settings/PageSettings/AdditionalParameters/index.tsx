import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import Card from '../../Card';
import CardHeader from '../../CardHeader';
import BtnAddNewRow from '../../BtnAddNewRow';
import FormRowItem from './FormRowItem';
import FormRowContainer from '../../FormRowContainer';
import { CSVLink } from 'react-csv';
import { reducer, useThunkReducer } from '../../../../../pages/api/useThunkReducer';
import { fetchData } from '../../../../../pages/api/apiConstants';
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
    data: []
  });
  useEffect(() => {
    dispatchRequest((e) => fetchData(e, 'CONSTRAINTS_ADP', ''));
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
      code: '',
      description: '',
      value: '',
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
        title={'Additional Parameters'}
        rightAction={
          <CSVLink filename={'additional-parameters.csv'} data={dataSource} headers={headersCSV}>
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
};

export default AdditionalParameters;
