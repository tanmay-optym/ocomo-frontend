import React, { useState, useEffect } from 'react';
import FormRowContainer from '../FormRowContainer';
import FormLabel from '../FormLabel';
import FormItem from '../FormItem';
import BtnAddNewRow from '../BtnAddNewRow';
import InputSetting from '../InputSetting';
import InputHours from '../InputHours';
import { useForm, useFieldArray } from 'react-hook-form';
import BtnAction from '../BtnAction';
import FormRowItem from './FormRowItem';

type IStandardWorkHours = {
  type: string;
  severityLevel: string;
  maxHour: number;
  minHour: number;
};

export default function FormStandardWorkHours(): React.FC {
  const [dataSource, setDataSource] = useState<IStandardWorkHours[] | null>([]);
  useEffect(() => {
    const fakeData: IStandardWorkHours[] = [
      {
        name: 'Engine Replacement',
        severityLevel: 'High',
        maxHour: 12,
        minHour: 30
      }
    ];
    setDataSource(fakeData);
  }, []);

  const handleAddNewRow = () => {
    setDataSource([
      ...dataSource,
      {
        name: '',
        severityLevel: '',
        maxHour: '',
        minHour: ''
      }
    ]);
  };

  const handleSaveData = (data) => {
    console.log(data);
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
      <FormRowContainer>
        <BtnAddNewRow onClick={handleAddNewRow} />
      </FormRowContainer>
    </div>
  );
}
