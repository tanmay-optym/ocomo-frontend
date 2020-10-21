import React, { useState, useEffect, Dispatch } from 'react';
import { Button } from '@material-ui/core';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import { CSVLink } from 'react-csv';
import TableData from './TableData';
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

const columns = [
  { title: 'Shop', dataIndex: 'shopCode' },
  { title: 'Region', dataIndex: 'region', editable: false },
  {
    title: 'Desired Unplanned',
    dataIndex: 'desiredUnplanned',
    editable: true,
  },
  {
    title: 'Special Capability',
    dataIndex: 'specialCapability',
    editable: true,
    require: false,
  },
  {
    title: 'Prohibited Maint. Type',
    dataIndex: 'prohibitedMaintType',
    editable: true,
    require: false,
  },
  {
    title: 'M-F Work Hours',
    dataIndex: 'weekDaysWorkHrs',
    editable: true,
  },
  {
    title: 'Sat Work Hours',
    dataIndex: 'satWorkHrs',
    editable: true,
  },
  {
    title: 'Sun Work Hours',
    dataIndex: 'sunWorkHrs',
    editable: true,
  },
];

const headersCSV = [
  {
    key: 'shopCode',
    label: 'Shop',
  },
  { key: 'region', label: 'Region' },
  { key: 'desiredUnplanned', label: 'Desired Unplanned' },
  { key: 'specialCapability', label: 'Special Capability' },
  { key: 'prohibitedMaintType', label: 'Prohibited Maint. Type' },
  { key: 'weekDaysWorkHrs', label: 'M-F Work Hours' },
  { key: 'satWorkHrs', label: 'Sat Work Hours' },
  { key: 'sunWorkHrs', label: 'Sun Work Hours' },
];

export default function TableResourcePlan(): JSX.Element {
  const [dataSource, setDataSource] = useState<IResourcePlan[]>([]);
  const [data, dispatchRequest] = useThunkReducer(reducer, {
    error: null,
    loading: false,
    data: [],
  });

  useEffect(() => {
    dispatchRequest((e: Dispatch<SetPayloadActionType>) =>
      fetchData(e, 'CONSTRAINTS_RESOURCE_PLAN', '')
    );
  }, []);

  const [dataErrors, setDataErrors] = useState({});

  useEffect(() => {
    setDataSource(data.data || []);
  }, [data]);

  const handleRowClick = (rowData: IResourcePlan) => {
    const hasRowError = Object.values(dataErrors).some((hasError) => hasError);
    if (hasRowError) {
      return;
    }
    const hasEditing = Object.values(dataSource).some((dataItem) => dataItem.editable);
    if (hasEditing) {
      return;
    }
    const rowIndex = dataSource.findIndex((dataItem) => dataItem.shopCode === rowData.shopCode);
    const dataItem = dataSource[rowIndex];
    const newDataSource = [...dataSource];
    newDataSource[rowIndex] = { ...dataItem, editable: true };
    setDataSource(newDataSource);
  };

  const handleHasErrors = (id: number, hasError: boolean) => {
    setDataErrors({ ...dataErrors, [id]: hasError });
  };

  const handleSaveData = (resData: any, index: number) => {
    const newDataSource = [...dataSource];
    newDataSource[index] = { ...newDataSource[index], ...resData, editable: false };
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
      <PageBody>
        <Spin spinning={data.loading}>
          <TableData
            onRowClick={handleRowClick}
            dataSource={dataSource}
            columns={columns}
            onFinish={handleSaveData}
            onHasErrors={handleHasErrors}
          />
        </Spin>
      </PageBody>
    </Card>
  );
}
