import React, { useState, useEffect } from 'react';
import FormRowItem from './FormRowItem';

type IAdditionalParameters = {
  shop1Name: string;
  shop2Name: string;
  estimatedTravelTime: number;
};

export default function FormAdditionalParameters(): React.FC {
  const [dataSource, setDataSource] = useState<IAdditionalParameters[] | null>([]);

  useEffect(() => {
    const fakeData: IAdditionalParameters[] = [
      {
        name: 'Apprentice Adjustment Percentage',
        value: '40'
      },
      {
        name: 'Temporary Productivity Adjustment Percentage',
        value: '30'
      },
      {
        name: 'Maximum Overtime Percentage',
        value: '25'
      },
      {
        name: 'Overtime Utilization Threshold',
        shop2Name: '58'
      }
    ];
    setDataSource(fakeData);
  }, []);

  const handleSaveData = (data) => {
    const newDataSource = [...dataSource];
    newDataSource[data.dataIndex] = data;
    setDataSource(newDataSource);
  };

  return (
    <div>
      {dataSource.map((data, index) => {
        return (
          <FormRowItem
            onFinish={handleSaveData}
            initialValues={{ ...data, dataIndex: index }}
            key={data.title}
          />
        );
      })}
    </div>
  );
}
