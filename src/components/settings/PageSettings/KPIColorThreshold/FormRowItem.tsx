import React, { Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { withSnackbar, SnackbarMessage, SnackbarKey, OptionsObject } from 'notistack';
import FormRowContainer from '../../FormRowContainer';
import FormItem from '../../FormItem';
import InputSetting from '../../InputSetting';
import FormLabel from '../../FormLabel';
import BtnAction from '../../BtnAction';
import FormItemExplainError from '../../FormItemExplainError';
import AlertWarningIcon from '../../SvgIcon/AlertWarningIcon';
import AlertErrorIcon from '../../SvgIcon/AlertErrorIcon';
import { updateData } from '../../../../../pages/api/apiConstants';
import { reducer, useThunkReducer } from '../../../../../pages/api/useThunkReducer';
import Spin from '../../Spin/Circular';

import { IKPIColorThreshold } from './index';

type FormRowItemProps = {
  initialValues: IKPIColorThreshold;
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
    const dataUpdate = { ...initialValues, ...values };
    dispatchRequest((e) => updateData(e, 'UI_SETTINGS_KPI', dataUpdate, `/${initialValues.code}`));
  };
  return (
    <form key={initialValues.code}>
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
