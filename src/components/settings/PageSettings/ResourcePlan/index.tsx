import React, { useState, useEffect } from 'react';
import TableData from '../../TableData';
import resourcePlanData from '../../../../../fakeData/resourcePlanData';
import { Button } from '@material-ui/core';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import Card from '../../Card';
import CardBody from '../../CardBody';
import CardHeader from '../../CardHeader';
import { CSVLink } from 'react-csv';

type IResourcePlan = {
  shopName: string;
  regionName: string;
  desiredUnplanned: number;
  specialCapability: string;
  prohibitedMaintType: string;
  mfWorkHours: number;
  satWorkHours: number;
  sunWorkHours: number;
};

export default function TableResourcePlan(): React.FC {
  const [dataSource, setDataSource] = useState<IResourcePlan[] | null>([]);

  useEffect(() => {
    setDataSource(resourcePlanData);
  }, []);

  const handleRowclick = () => {
    if (!dataSource.every((data) => data.editable)) {
      setDataSource(dataSource.map((data) => ({ ...data, editable: true })));
    }
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

  const handleSaveInputCell = (rowData, values) => {
    const newDataSource = [...dataSource];
    const cellIndex = dataSource?.findIndex((data) => data.id === rowData.id);
    newDataSource[cellIndex] = { ...newDataSource[cellIndex], ...values };
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
          onBlurInput={(rowData, values) => {
            console.log(rowData, values);
            handleSaveInputCell(rowData, values);
          }}
          onRowClick={handleRowclick}
          dataSource={dataSource}
          columns={columns}
        />
      </CardBody>
    </Card>
  );
}
