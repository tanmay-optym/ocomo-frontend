import React, { useState, useEffect } from 'react';
import TableData from './TableData';
import { Button } from '@material-ui/core';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import Card from '../../Card';
import CardBody from '../../CardBody';
import CardHeader from '../../CardHeader';
import { CSVLink } from 'react-csv';
import { reducer, useThunkReducer } from '../../../../../pages/api/useThunkReducer';
import { fetchData } from '../../../../../pages/api/apiConstants';
import Spin from '../../Spin';

export type IResourcePlan = {
  id: number;
  shopCode: string;
  region: string;
  desiredUnplanned: number;
  specialCapability: string;
  prohibitedMaintType: string;
  weekDaysWorkHrs: number;
  satWorkHrs: number;
  sunWorkHrs: number;
  editable?: boolean;
};

export default function TableResourcePlan(): JSX.Element {
  const [dataSource, setDataSource] = useState<IResourcePlan[]>([]);
  const [data, dispatchRequest] = useThunkReducer(reducer, {
    error: null,
    loading: false,
    data: []
  });

  useEffect(() => {
    dispatchRequest((e) => fetchData(e, 'CONSTRAINTS_RESOURCE_PLAN', ''));
  }, []);

  const [dataErrors, setDataErrors] = useState({});

  useEffect(() => {
    setDataSource(data.data || []);
  }, [data]);

  const handleRowclick = (rowData) => {
    const hasRowError = Object.values(dataErrors).some((hasError) => hasError);
    if (hasRowError) {
      return;
    }
    const hasEditting = Object.values(dataSource).some((data) => data.editable);
    if (hasEditting) {
      return;
    }
    const rowIndex = dataSource.findIndex((data) => data.id === rowData.id);
    const data = dataSource[rowIndex];
    const newDataSource = [...dataSource];
    newDataSource[rowIndex] = { ...data, editable: true };
    setDataSource(newDataSource);
  };

  const handleHasErrors = (id, hasError) => {
    setDataErrors({ ...dataErrors, [id]: hasError });
  };

  const headersCSV = [
    {
      key: 'shopCode',
      label: 'Shop'
    },
    { key: 'region', label: 'Region' },
    { key: 'desiredUnplanned', label: 'Desired Unplanned' },
    { key: 'specialCapability', label: 'Special Capability' },
    { key: 'prohibitedMaintType', label: 'Prohibited Maint. Type' },
    { key: 'weekDaysWorkHrs', label: 'M-F Work Hours' },
    { key: 'satWorkHrs', label: 'Sat Work Hours' },
    { key: 'sunWorkHrs', label: 'Sun Work Hours' }
  ];
  const columns = [
    { title: 'Shop', dataIndex: 'shopCode' },
    { title: 'Region', dataIndex: 'region', editable: true },
    {
      title: 'Desired Unplanned',
      dataIndex: 'desiredUnplanned',
      editable: true
    },
    {
      title: 'Special Capability',
      dataIndex: 'specialCapability',
      editable: true
    },
    {
      title: 'Prohibited Maint. Type',
      dataIndex: 'prohibitedMaintType',
      editable: true
    },
    {
      title: 'M-F Work Hours',
      dataIndex: 'weekDaysWorkHrs',
      editable: true
    },
    {
      title: 'Sat Work Hours',
      dataIndex: 'satWorkHrs',
      editable: true
    },
    {
      title: 'Sun Work Hours',
      dataIndex: 'sunWorkHrs',
      editable: true
    }
  ];

  const handleSaveData = (data) => {
    const rowDataIndex = dataSource.findIndex((item) => item.id === data.id);
    const newDataSource = [...dataSource];
    newDataSource[rowDataIndex] = { ...data, editable: false };
    setDataSource(newDataSource);
  };
  return (
    <Card>
      <CardHeader
        title={'Resource Plan'}
        rightAction={
          <CSVLink filename={'resource-plan.csv'} data={dataSource} headers={headersCSV}>
            <Button>
              <GetAppOutlinedIcon />
            </Button>
          </CSVLink>
        }
      />
      <CardBody>
        <Spin spinning={data.loading}>
          <TableData
            onRowClick={handleRowclick}
            dataSource={dataSource}
            columns={columns}
            onFinish={handleSaveData}
            onHasErrors={handleHasErrors}
          />
        </Spin>
      </CardBody>
    </Card>
  );
}
