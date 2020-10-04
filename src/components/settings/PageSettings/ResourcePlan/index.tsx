import React, { useState, useEffect } from 'react';
import TableData from './TableData';
import resourcePlanData from '../../../../../fakeData/resourcePlanData';
import { Button } from '@material-ui/core';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import Card from '../../Card';
import CardBody from '../../CardBody';
import CardHeader from '../../CardHeader';
import { CSVLink } from 'react-csv';

export type IResourcePlan = {
  id: number;
  shopName: string;
  regionName: string;
  desiredUnplanned: number;
  specialCapability: string;
  prohibitedMaintType: string;
  mfWorkHours: number;
  satWorkHours: number;
  sunWorkHours: number;
  editable?: boolean;
};

export default function TableResourcePlan(): JSX.Element {
  const [dataSource, setDataSource] = useState<IResourcePlan[]>([]);
  const [dataErrors, setDataErrors] = useState({});
  useEffect(() => {
    setDataSource(resourcePlanData);
  }, []);

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
      key: 'shopName',
      label: 'Shop'
    },
    { key: 'regionName', label: 'Region' },
    { key: 'desiredUnplanned', label: 'Desired Unplanned' },
    { key: 'specialCapability', label: 'Special Capability' },
    { key: 'prohibitedMaintType', label: 'Prohibited Maint. Type' },
    { key: 'mfWorkHours', label: 'M-F Work Hours' },
    { key: 'satWorkHours', label: 'Sat Work Hours' },
    { key: 'sunWorkHours', label: 'Sun Work Hours' }
  ];
  const columns = [
    { title: 'Shop', dataIndex: 'shopName' },
    { title: 'Region', dataIndex: 'regionName', editable: true },
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
      dataIndex: 'mfWorkHours',
      editable: true
    },
    {
      title: 'Sat Work Hours',
      dataIndex: 'satWorkHours',
      editable: true
    },
    {
      title: 'Sun Work Hours',
      dataIndex: 'sunWorkHours',
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
        <TableData
          onRowClick={handleRowclick}
          dataSource={dataSource}
          columns={columns}
          onFinish={handleSaveData}
          onHasErrors={handleHasErrors}
        />
      </CardBody>
    </Card>
  );
}
