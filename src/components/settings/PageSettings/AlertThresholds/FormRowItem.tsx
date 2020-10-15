import React from 'react';
import { useForm } from 'react-hook-form';
import FormRowContainer from '../../FormRowContainer';
import FormItem from '../../FormItem';
import InputSetting from '../../InputSetting';
import FormLabel from '../../FormLabel';
import FormItemExplainError from '../../FormItemExplainError';
import AlertWarningIcon from '../../SvgIcon/AlertWarningIcon';
import AlertErrorIcon from '../../SvgIcon/AlertErrorIcon';
import useUpdate from '../../../../api/useUpdate';

import { IAlertThresholds } from './index';
import FormItemActionSave from '../../FormItemActionSave';

type FormRowItemProps = {
  initialValues: IAlertThresholds;
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
  const [data, onSubmit] = useUpdate(onFinish, initialValues, 'UI_SETTINGS_ADP', 'code', index);
  return (
    <form key={initialValues.code} onSubmit={handleSubmit(onSubmit)}>
      <FormRowContainer>
        {initialValues.description !== '' ? (
          <>
            <FormLabel style={{ width: 400 }}>{initialValues.description}</FormLabel>
          </>
        ) : (
          <FormItem margin={0} label="">
            <InputSetting
              style={{ width: 400, marginRight: 0 }}
              name="description"
              refinput={register({ required: 'Required' })}
            />
            <FormItemExplainError errors={errors} fieldName="description" />
          </FormItem>
        )}
        <FormItem margin={60} label={<AlertWarningIcon style={{ marginTop: 8 }} />}>
          <InputSetting name="orangeAlert" refinput={register({ required: 'Required' })} />
          <FormItemExplainError errors={errors} fieldName="orangeAlert" />
        </FormItem>
        <FormItem margin={60} label={<AlertErrorIcon style={{ marginTop: 8 }} />}>
          <InputSetting name="redAlert" refinput={register({ required: 'Required' })} />
          <FormItemExplainError errors={errors} fieldName="redAlert" />
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
