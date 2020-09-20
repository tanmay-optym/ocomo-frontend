import React, { useState, useEffect } from 'react';
import TableData from '../TableData';

type IStandardWorkHours = {
  type: string;
  severityLevel: string;
  majorShopStdHours: number;
  minorShopStdHours: number;
};

export default function TableStandardWorkHours(): React.FC {
  const [dataSource, setDataSource] = useState<IStandardWorkHours[] | null>([]);

  useEffect(() => {
    const fakeData: IStandardWorkHours[] = [
      {
        type: 'Engine Replacement',
        severityLevel: 'High',
        majorShopStdHours: 12,
        minorShopStdHours: 30
      }
    ];
    setDataSource(fakeData);
  }, []);

  const columns = [
    {
      title: 'Inspection/Defect Type',
      dataIndex: 'type'
    },
    {
      title: 'Severity Level',
      dataIndex: 'severityLevel'
    },
    {
      title: 'Major Shop Std. Hours',
      dataIndex: 'majorShopStdHours'
    },
    {
      title: 'Minor Shop Std. Hours',
      dataIndex: 'minorShopStdHours'
    }
  ];
  return <TableData dataSource={dataSource} columns={columns} />;
}
