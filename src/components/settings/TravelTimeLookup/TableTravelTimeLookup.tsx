import React, { useState, useEffect } from 'react';
import TableData from '../TableData';

type ITravelTimeLookup = {
  shop1Name: string;
  shop2Name: string;
  estimatedTravelTime: number;
};

export default function TableTravelTimeLookup(): React.FC {
  const [dataSource, setDataSource] = useState<ITravelTimeLookup[] | null>([]);

  useEffect(() => {
    const fakeData: IStandardWorkHours[] = [
      {
        shop1Name: 'Sym',
        shop2Name: 'MAC',
        estimatedTravelTime: 45
      },
      {
        shop1Name: 'Sym',
        shop2Name: 'TAS',
        estimatedTravelTime: 48
      },
      {
        shop1Name: 'KIR',
        shop2Name: 'PRG',
        estimatedTravelTime: 24
      },
      {
        shop1Name: 'KIR',
        shop2Name: 'THO',
        estimatedTravelTime: 36
      },
      {
        shop1Name: 'MEM',
        shop2Name: 'KIR',
        estimatedTravelTime: 42
      }
    ];
    setDataSource(fakeData);
  }, []);

  const columns = [
    {
      title: 'Shop 1',
      dataIndex: 'shop1Name'
    },
    {
      title: 'Shop 2',
      dataIndex: 'shop2Name'
    },
    {
      title: 'Estimated Travel Time (hrs)',
      dataIndex: 'estimatedTravelTime'
    }
  ];
  return <TableData dataSource={dataSource} columns={columns} />;
}
