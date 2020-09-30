import React, { useState, useEffect } from 'react';
import FormRowContainer from '../FormRowContainer';
import FormItem from '../FormItem';
import InputHours from '../InputHours';
import InputSelectShop from '../InputSelectShop';
import TrendingFlatIcon from '../SvgIcon/TrendingFlatIcon';
import FormRowItem from './FormRowItem';

type ITravelTimeLookup = {
  shop1: string;
  shop2: string;
  estimatedTravelTime: number;
};

export default function FormTravelTimeLookup(): React.FC {
  const [dataSource, setDataSource] = useState<ITravelTimeLookup[] | null>([]);

  useEffect(() => {
    const fakeData: IStandardWorkHours[] = [
      {
        shop1: 'SYM',
        shop2: 'MAC',
        estimatedTravelTime: 45
      },
      {
        shop1: 'SYM',
        shop2: 'TAS',
        estimatedTravelTime: 48
      },
      {
        shop1: 'KIR',
        shop2: 'PRG',
        estimatedTravelTime: 24
      },
      {
        shop1: 'KIR',
        shop2: 'THO',
        estimatedTravelTime: 36
      },
      {
        shop1: 'MEM',
        shop2: 'KIR',
        estimatedTravelTime: 42
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
      {dataSource.map((data) => {
        return <FormRowItem key={data.key} initialValues={{ ...data }} onFinish={handleSaveData} />;
      })}
    </div>
  );
}
