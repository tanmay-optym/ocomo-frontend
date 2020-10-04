import React, { Fragment } from 'react';
import FormRowContainer from '../../FormRowContainer';
import FormLabel from '../../FormLabel';
import FormItem from '../../FormItem';
import InputSetting from '../../InputSetting';
import InputHours from '../../InputHours';
import { useForm } from 'react-hook-form';
import BtnAction from '../../BtnAction';
import FormItemExplainError from '../../FormItemExplainError';
import { IStandardWorkHours } from './index';

type FormRowItemProps = {
  initialValues: IStandardWorkHours;
  onFinish: (values: object) => void;
};

export default function FormRowItem({ initialValues, onFinish }: FormRowItemProps): JSX.Element {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: { ...initialValues }
  });
  const onSubmit = (values) => {
    if (onFinish) {
      onFinish({ ...initialValues, ...values });
    }
  };

  return (
    <form key={initialValues.id} onSubmit={handleSubmit(onSubmit)}>
      <FormRowContainer>
        {initialValues.name !== '' ? (
          <Fragment>
            <FormLabel style={{ width: 194 }}>{initialValues.name}</FormLabel>
          </Fragment>
        ) : (
          <FormItem margin={0} label={''}>
            <InputSetting
              style={{ width: 194, marginRight: 0 }}
              name="name"
              refInput={register({ required: 'Required' })}
            />
            <FormItemExplainError errors={errors} fieldName={'name'} />
          </FormItem>
        )}
        <FormItem label={'Severity'}>
          <InputSetting name="severityLevel" refInput={register({ required: 'Required' })} />
          <FormItemExplainError errors={errors} fieldName={'severityLevel'} />
        </FormItem>
        <FormItem label={'Max'}>
          <InputHours name="maxHour" refInput={register({ required: 'Required' })} />
          <FormItemExplainError errors={errors} fieldName={'maxHour'} />
        </FormItem>
        <FormItem label={'Min'}>
          <InputHours name="minHour" refInput={register({ required: 'Required' })} />
          <FormItemExplainError errors={errors} fieldName={'minHour'} />
        </FormItem>
        <FormItem>
          <BtnAction type="submit">Save</BtnAction>
        </FormItem>
      </FormRowContainer>
    </form>
  );
}
