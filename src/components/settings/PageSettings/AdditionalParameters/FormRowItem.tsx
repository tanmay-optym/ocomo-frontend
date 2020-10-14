import React from 'react';
import { useForm } from 'react-hook-form';
import FormRowContainer from '../../FormRowContainer';
import FormItem from '../../FormItem';
import InputSetting from '../../InputSetting';
import FormLabel from '../../FormLabel';
import FormItemExplainError from '../../FormItemExplainError';
import useUpdate from '../../../../hooks/useUpdate';

import { IAdditionalParameters } from './index';
import FormItemActionSave from '../../FormItemActionSave';

type FormRowItemProps = {
  initialValues: IAdditionalParameters;
  onFinish: (values: any, index: number) => void;
  index: number;
};

export default function FormRowItem({
  initialValues,
  onFinish,
  index,
}: FormRowItemProps): JSX.Element {
  const { register, handleSubmit, errors, watch, formState } = useForm({
    defaultValues: { ...initialValues },
  });
  const [data, onSubmit] = useUpdate(onFinish, initialValues, 'CONSTRAINTS_ADP', 'code', index);
  return (
    <form key={initialValues.code} onSubmit={handleSubmit(onSubmit)}>
      <FormRowContainer>
        {initialValues.description !== '' ? (
          <FormLabel style={{ width: 350 }}>{initialValues.description}</FormLabel>
        ) : (
          <FormItem margin={0} label="">
            <InputSetting
              style={{ width: 350 }}
              name="description"
              refinput={register({ required: 'Required' })}
            />
            <FormItemExplainError errors={errors} fieldName="description" />
          </FormItem>
        )}
        <FormItem margin={120} label="">
          <InputSetting name="value" refinput={register({ required: 'Required' })} />
          <FormItemExplainError errors={errors} fieldName="value" />
        </FormItem>
        <FormItemActionSave
          initialValues={initialValues}
          values={watch()}
          isDirty={formState.isDirty}
          loading={data.loading}
        />
      </FormRowContainer>
    </form>
  );
}
