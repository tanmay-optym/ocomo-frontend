import React from 'react';
import { useForm } from 'react-hook-form';
import FormRowContainer from '../FormRowContainer';
import FormItem from '../FormItem';
import InputSetting from '../InputSetting';
import FormLabel from '../FormLabel';
import BtnAction from '../BtnAction';

export default function FormRowItem({ initialValues, onFinish }): React.FC {
  const { register, handleSubmit } = useForm({
    defaultValues: { ...initialValues }
  });

  const onSubmit = (values) => {
    if (onFinish) {
      onFinish({ ...values, dataIndex: initialValues.dataIndex });
    }
  };
  return (
    <form key={initialValues.dataIndex} onSubmit={handleSubmit(onSubmit)}>
      <FormRowContainer>
        <FormLabel style={{ minWidth: 350 }}>
          {initialValues.name}
          <InputSetting name="name" type="hidden" refInput={register()} />
        </FormLabel>
        <FormItem margin={120} label={''}>
          <InputSetting name="value" refInput={register()} />
        </FormItem>
        <FormItem>
          <BtnAction type="submit">Save</BtnAction>
        </FormItem>
      </FormRowContainer>
    </form>
  );
}
