import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import FormRowContainer from '../../FormRowContainer';
import FormItem from '../../FormItem';
import InputSetting from '../../InputSetting';
import FormLabel from '../../FormLabel';
import BtnAction from '../../BtnAction';
import FormItemExplainError from '../../FormItemExplainError';
import AlertWarningIcon from '../../SvgIcon/AlertWarningIcon';
import AlertErrorIcon from '../../SvgIcon/AlertErrorIcon';

import { IKPIColorThreshold } from './index';

type FormRowItemProps = {
  initialValues: IKPIColorThreshold;
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
    <form key={initialValues.code} onSubmit={handleSubmit(onSubmit)}>
      <FormRowContainer>
        {initialValues.description !== '' ? (
          <Fragment>
            <FormLabel style={{ width: 300 }}>{initialValues.description}</FormLabel>
          </Fragment>
        ) : (
          <FormItem margin={0} label={''}>
            <InputSetting
              style={{ width: 300, marginRight: 10 }}
              name="description"
              refInput={register({ required: 'Required' })}
            />
            <FormItemExplainError errors={errors} fieldName={'description'} />
          </FormItem>
        )}
        <FormItem margin={60} label={<AlertWarningIcon style={{ marginTop: 8 }} />}>
          <InputSetting name="orangeKpi" refInput={register({ required: 'Required' })} />
          <FormItemExplainError errors={errors} fieldName={'orangeKpi'} />
        </FormItem>
        <FormItem margin={60} label={<AlertErrorIcon style={{ marginTop: 8 }} />}>
          <InputSetting name="redKpi" refInput={register({ required: 'Required' })} />
          <FormItemExplainError errors={errors} fieldName={'redKpi'} />
        </FormItem>
        <FormItem>
          <BtnAction type="submit">Save</BtnAction>
        </FormItem>
      </FormRowContainer>
    </form>
  );
}
