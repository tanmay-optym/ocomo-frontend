import React, { useState, useEffect } from 'react';
import FormRowContainer from '../FormRowContainer';
import FormLabel from '../FormLabel';
import FormItem from '../FormItem';
import BtnAddNewRow from '../BtnAddNewRow';
import InputSetting from '../InputSetting';
import InputHours from '../InputHours';

type IStandardWorkHours = {
  type: string;
  severityLevel: string;
  majorShopStdHours: number;
  minorShopStdHours: number;
};

export default function FormStandardWorkHours(): React.FC {
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

  return (
    <div>
      {dataSource.map((data) => {
        return (
          <FormRowContainer key={data.title}>
            <FormLabel style={{ width: 194 }}>Engine Replacement</FormLabel>
            <FormItem label={'Severity'}>
              <InputSetting />
            </FormItem>
            <FormItem label={'Max'}>
              <InputHours />
            </FormItem>
            <FormItem label={'Min'}>
              <InputHours />
            </FormItem>
          </FormRowContainer>
        );
      })}
      <FormRowContainer>
        <BtnAddNewRow />
        <FormItem label={'Severity'}>
          <InputSetting />
        </FormItem>
        <FormItem label={'Max'}>
          <InputHours />
        </FormItem>
        <FormItem label={'Min'}>
          <InputHours />
        </FormItem>
      </FormRowContainer>
    </div>
  );
}
