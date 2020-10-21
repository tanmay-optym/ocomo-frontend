import React from 'react';
import { useForm } from 'react-hook-form';
import FormRowContainer from '../../FormRowContainer';
import FormLabel from '../../FormLabel';
import FormItem from '../../FormItem';
import InputSetting from '../../InputSetting';
import InputHours from '../../InputHours';
import FormItemExplainError from '../../FormItemExplainError';
import { IStandardWorkHours } from './index';
import useUpdate from '../../../../api/useUpdate';
import FormItemActionSave from '../../FormItemActionSave';

type FormRowItemProps = {
  initialValues: IStandardWorkHours;
  onFinish: (values: any, index: number) => void;
  index: number;
};

export default function FormRowItem({
  initialValues,
  onFinish,
  index,
}: FormRowItemProps): JSX.Element {
  const { register, handleSubmit, errors, formState, watch } = useForm({
    defaultValues: { ...initialValues },
  });
  const [data, onSubmit] = useUpdate(onFinish, initialValues, 'CONSTRAINTS_SWH', 'code', index);
  return (
    <form key={initialValues.code} onSubmit={handleSubmit(onSubmit)}>
      <FormRowContainer>
        {initialValues.description !== '' ? (
          <FormLabel style={{ width: 194 }}>{initialValues.description}</FormLabel>
        ) : (
          <FormItem margin={0} label={''}>
            <InputSetting
              style={{ width: 194, marginRight: 0 }}
              name="description"
              refinput={register({ required: 'Required' })}
            />
            <FormItemExplainError errors={errors} fieldName={'description'} />
          </FormItem>
        )}
        <FormItem label={'Severity'}>
          <InputSetting name="severityLevel" refinput={register({ required: 'Required' })} />
          <FormItemExplainError errors={errors} fieldName={'severityLevel'} />
        </FormItem>
        <FormItem label={'Max'}>
          <InputHours name="majorStopStdHrs" refinput={register({ required: 'Required' })} />
          <FormItemExplainError errors={errors} fieldName={'majorStopStdHrs'} />
        </FormItem>
        <FormItem label={'Min'}>
          <InputHours name="minorStopStdHrs" refinput={register({ required: 'Required' })} />
          <FormItemExplainError errors={errors} fieldName={'minorStopStdHrs'} />
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
