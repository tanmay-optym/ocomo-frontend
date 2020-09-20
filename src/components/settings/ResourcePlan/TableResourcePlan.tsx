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
      dataIndex: 'desiredUnplanned'
    },
    {
      title: 'Special Capability',
      dataIndex: 'specialCapability'
    },
    {
      title: 'Prohibited Maint. Type',
      dataIndex: 'prohibitedMaintType'
    },
    {
      title: 'M-F Work Hours',
      dataIndex: 'mfWorkHours'
    },
    {
      title: 'Sat Work Hours',
      dataIndex: 'satWorkHours'
    },
    {
      title: 'Sun Work Hours',
      dataIndex: 'sunWorkHours'
    }
  ];

  return <TableData dataSource={dataSource} columns={columns} />;
}
