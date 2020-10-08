import React, { Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { withSnackbar, SnackbarMessage, SnackbarKey, OptionsObject } from 'notistack';
import FormRowContainer from '../../FormRowContainer';
import FormItem from '../../FormItem';
import InputSetting from '../../InputSetting';
import FormLabel from '../../FormLabel';
import BtnAction from '../../BtnAction';
import FormItemExplainError from '../../FormItemExplainError';
import { updateData } from '../../../../../pages/api/apiConstants';
import { reducer, useThunkReducer } from '../../../../../pages/api/useThunkReducer';
import Spin from '../../Spin/Circular';

import { IAdditionalParameters } from './index';

type FormRowItemProps = {
  initialValues: IAdditionalParameters;
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

  const onSubmit = (values) => {
    if (onFinish) {
      const dataUpdate = { ...initialValues, ...values };
      dispatchRequest((e) =>
        updateData(e, 'CONSTRAINTS_ADP', dataUpdate, `/${initialValues.code}`)
      );
    }
  };
  return (
    <form key={initialValues.code}>
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
          <BtnAction onClick={handleSubmit(onSubmit)}>
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
