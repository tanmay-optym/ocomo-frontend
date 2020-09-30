import React, { useState, useEffect } from 'react';
import TableData from '../TableData';
import resourcePlanData from '../../../../fakeData/resourcePlanData';

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

  const columns = [
    { title: 'Shop', dataIndex: 'shopName' },
    { title: 'Region', dataIndex: 'regionName' },
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

  return <TableData dataSource={dataSource} columns={columns} />;
}
