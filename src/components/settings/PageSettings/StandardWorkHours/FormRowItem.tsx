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
import useUpdate from '../../../../api/useUpdate';

type FormRowItemProps = {
  initialValues: IStandardWorkHours;
  onFinish: (values: object, index: number) => void;
  index: number;
};

export default function FormRowItem({
  initialValues,
  onFinish,
  index
}: FormRowItemProps): JSX.Element {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: { ...initialValues }
  });

  const [data, onSubmit] = useUpdate(onFinish, initialValues, 'CONSTRAINTS_SWH', 'code', index);
  return (
    <form key={initialValues.code} onSubmit={handleSubmit(onSubmit)}>
      <FormRowContainer>
        {initialValues.description !== '' ? (
          <Fragment>
            <FormLabel style={{ width: 194 }}>{initialValues.description}</FormLabel>
          </Fragment>
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
        <FormItem label={'Major'}>
          <InputHours name="majorStopStdHrs" refinput={register({ required: 'Required' })} />
          <FormItemExplainError errors={errors} fieldName={'majorStopStdHrs'} />
        </FormItem>
        <FormItem label={'Min'}>
          <InputHours name="minorStopStdHrs" refinput={register({ required: 'Required' })} />
          <FormItemExplainError errors={errors} fieldName={'minorStopStdHrs'} />
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
