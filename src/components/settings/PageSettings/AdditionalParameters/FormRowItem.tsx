import React, { Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import FormRowContainer from '../../FormRowContainer';
import FormItem from '../../FormItem';
import InputSetting from '../../InputSetting';
import FormLabel from '../../FormLabel';
import BtnAction from '../../BtnAction';
import FormItemExplainError from '../../FormItemExplainError';
import useUpdate from '../../../../hooks/useUpdate';

import { IAdditionalParameters } from './index';

type FormRowItemProps = {
  initialValues: IAdditionalParameters;
  onFinish: (values: object) => void;
};

export default function FormRowItem({ initialValues, onFinish }: FormRowItemProps): JSX.Element {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: { ...initialValues }
  });

  const [data, onSubmit] = useUpdate(onFinish, initialValues, 'CONSTRAINTS_ADP', 'code');
  return (
    <form key={initialValues.code} onSubmit={handleSubmit(onSubmit)}>
      <FormRowContainer>
        {initialValues.description !== '' ? (
          <Fragment>
            <FormLabel style={{ width: 350 }}>{initialValues.description}</FormLabel>
          </Fragment>
        ) : (
          <FormItem margin={0} label={''}>
            <InputSetting
              style={{ width: 350 }}
              name="description"
              refInput={register({ required: 'Required' })}
            />
            <FormItemExplainError errors={errors} fieldName={'description'} />
          </FormItem>
        )}
        <FormItem margin={120} label={''}>
          <InputSetting name="value" refInput={register({ required: 'Required' })} />
          <FormItemExplainError errors={errors} fieldName={'value'} />
        </FormItem>
        <FormItem>
          <BtnAction type="submit" loading={data.loading}>
            Save
          </BtnAction>
        </FormItem>
      </FormRowContainer>
    </form>
  );
}
