import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import FormRowContainer from '../../FormRowContainer';
import FormItem from '../../FormItem';
import InputSetting from '../../InputSetting';
import FormLabel from '../../FormLabel';
import BtnAction from '../../BtnAction';
import FormItemExplainError from '../../FormItemExplainError';

export default function FormRowItem({ initialValues, onFinish }): React.FC {
  const { register, handleSubmit, errors } = useForm({
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
        {initialValues.name !== '' ? (
          <Fragment>
            <FormLabel style={{ width: 350 }}>{initialValues.name}</FormLabel>
            <FormItem label={''}>
              <InputSetting type="hidden" name="name" refInput={register()} />
            </FormItem>
          </Fragment>
        ) : (
          <FormItem margin={0} label={''}>
            <InputSetting
              style={{ width: 350, marginRight: 10 }}
              name="name"
              refInput={register({ required: 'Required' })}
            />
            <FormItemExplainError errors={errors} fieldName={'name'} />
          </FormItem>
        )}
        <FormItem margin={120} label={''}>
          <InputSetting name="value" refInput={register({ required: 'Required' })} />
          <FormItemExplainError errors={errors} fieldName={'value'} />
        </FormItem>
        <FormItem>
          <BtnAction type="submit">Save</BtnAction>
        </FormItem>
      </FormRowContainer>
    </form>
  );
}
