import React, { Fragment, useEffect } from 'react';
import { withSnackbar, SnackbarMessage, SnackbarKey, OptionsObject } from 'notistack';
import FormRowContainer from '../../FormRowContainer';
import FormLabel from '../../FormLabel';
import FormItem from '../../FormItem';
import InputSetting from '../../InputSetting';
import InputHours from '../../InputHours';
import { useForm } from 'react-hook-form';
import BtnAction from '../../BtnAction';
import FormItemExplainError from '../../FormItemExplainError';
import { IStandardWorkHours } from './index';
import { updateData } from '../../../../../pages/api/apiConstants';
import { reducer, useThunkReducer } from '../../../../../pages/api/useThunkReducer';
import Spin from '../../Spin/Circular';

type FormRowItemProps = {
  initialValues: IStandardWorkHours;
  onFinish: (values: object) => void;
  enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey;
};

function FormRowItem({ initialValues, onFinish, enqueueSnackbar }: FormRowItemProps): JSX.Element {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: { ...initialValues }
  });
  const [data, dispatchRequest] = useThunkReducer(reducer, {
    error: null,
    loading: false,
    data: null
  });

  useEffect(() => {
    if (data.data || data.error) {
      window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
      let message = 'Saved';
      let variant = 'success';
      if (data.error !== null) {
        message = 'Failed';
        variant = 'error';
      } else if (onFinish) {
        onFinish(data.data);
      }
      enqueueSnackbar(message, { variant });
    }
  }, [data]);

  const onSubmit = (values: Object) => {
    if (onFinish && !data.loading) {
      const dataUpdate = { description: initialValues.description, ...values };
      dispatchRequest((e) =>
        updateData(e, 'CONSTRAINTS_SWH', dataUpdate, `/${initialValues.code}`)
      );
    }
  };

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
              refInput={register({ required: 'Required' })}
            />
            <FormItemExplainError errors={errors} fieldName={'description'} />
          </FormItem>
        )}
        <FormItem label={'Severity'}>
          <InputSetting name="severityLevel" refInput={register({ required: 'Required' })} />
          <FormItemExplainError errors={errors} fieldName={'severityLevel'} />
        </FormItem>
        <FormItem label={'Max'}>
          <InputHours name="majorStopStdHrs" refInput={register({ required: 'Required' })} />
          <FormItemExplainError errors={errors} fieldName={'majorStopStdHrs'} />
        </FormItem>
        <FormItem label={'Min'}>
          <InputHours name="minorStopStdHrs" refInput={register({ required: 'Required' })} />
          <FormItemExplainError errors={errors} fieldName={'minorStopStdHrs'} />
        </FormItem>
        <FormItem>
          <BtnAction type="submit">
            <Spin spinning={data.loading} style={{ width: '26px', height: '26px' }}>
              Save
            </Spin>
          </BtnAction>
        </FormItem>
      </FormRowContainer>
    </form>
  );
}

export default withSnackbar(FormRowItem);
