import React from 'react';
import { useForm } from 'react-hook-form';
import FormRowContainer from '../../FormRowContainer';
import FormItem from '../../FormItem';
import InputSetting from '../../InputSetting';
import FormLabel from '../../FormLabel';
import FormItemExplainError from '../../FormItemExplainError';
import AlertWarningIcon from '../../SvgIcon/AlertWarningIcon';
import AlertErrorIcon from '../../SvgIcon/AlertErrorIcon';
import useUpdate from '../../../../hooks/useUpdate';

import { IKPIColorThreshold } from './index';
import FormItemActionSave from '../../FormItemActionSave';

type FormRowItemProps = {
  initialValues: IKPIColorThreshold;
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
  const [data, onSubmit] = useUpdate(onFinish, initialValues, 'UI_SETTINGS_KPI', 'code', index);

  return (
    <form key={initialValues.code} onSubmit={handleSubmit(onSubmit)}>
      <FormRowContainer>
        {initialValues.description !== '' ? (
          <FormLabel style={{ width: 300 }}>{initialValues.description}</FormLabel>
        ) : (
          <FormItem margin={0} label={''}>
            <InputSetting
              style={{ width: 300, marginRight: 0 }}
              name="description"
              refinput={register({ required: 'Required' })}
            />
            <FormItemExplainError errors={errors} fieldName={'description'} />
          </FormItem>
        )}
        <FormItem margin={60} label={<AlertWarningIcon style={{ marginTop: 8 }} />}>
          <InputSetting name="orangeKpi" refinput={register({ required: 'Required' })} />
          <FormItemExplainError errors={errors} fieldName={'orangeKpi'} />
        </FormItem>
        <FormItem margin={60} label={<AlertErrorIcon style={{ marginTop: 8 }} />}>
          <InputSetting name="redKpi" refinput={register({ required: 'Required' })} />
          <FormItemExplainError errors={errors} fieldName={'redKpi'} />
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
