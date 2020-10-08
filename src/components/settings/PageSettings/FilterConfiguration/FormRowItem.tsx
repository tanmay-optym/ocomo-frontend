import React, { Fragment, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { withSnackbar, SnackbarMessage, SnackbarKey, OptionsObject } from 'notistack';
import FormRowContainer from '../../FormRowContainer';
import FormItem from '../../FormItem';
import InputSetting from '../../InputSetting';
import FormLabel from '../../FormLabel';
import FormItemExplainError from '../../FormItemExplainError';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import { IFilterConfiguration } from './index';
import { updateData } from '../../../../../pages/api/apiConstants';
import { reducer, useThunkReducer } from '../../../../../pages/api/useThunkReducer';

const switch_height = 20;
const switch_width = 40;
const AntSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: switch_width,
      height: switch_height,
      padding: 0,
      display: 'flex'
    },
    switchBase: {
      padding: 4,
      color: '#778899',
      '&$checked': {
        transform: 'translateX(20px)',
        color: '#0095DA',
        '& + $track': {
          opacity: 1,
          backgroundColor: '#fff',
          borderColor: theme.palette.primary.main
        }
      }
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: 'none'
    },
    track: {
      border: `3px solid #778899`,
      borderRadius: switch_height / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white
    },
    checked: {}
  })
)(Switch);

type FormRowItemProps = {
  initialValues: IFilterConfiguration;
  onFinish: (values: object) => void;
  onRemove: (id: string) => void;
  enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey;
};

function FormRowItem({
  initialValues,
  onFinish,
  onRemove,
  enqueueSnackbar
}: FormRowItemProps): JSX.Element {
  const { register, errors, control, watch } = useForm({
    defaultValues: { ...initialValues }
  });
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(initialValues.value);
  }, [initialValues]);
  const values = watch();
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
    dispatchRequest((e) =>
      updateData(e, 'UI_SETTINGS_FILTER', dataUpdate, `/${initialValues.code}`)
    );
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove(initialValues.code);
    }
  };

  return (
    <form style={{ display: 'flex' }} key={initialValues.code}>
      <FormRowContainer>
        {initialValues.description !== '' ? (
          <Fragment>
            <FormLabel style={{ width: 150 }}>{initialValues.description}</FormLabel>
          </Fragment>
        ) : (
          <FormItem margin={0} label={''}>
            <InputSetting
              style={{ width: 150, marginRight: 10 }}
              name="description"
              refInput={register({ required: 'Required' })}
            />
            <FormItemExplainError errors={errors} fieldName={'description'} />
          </FormItem>
        )}
        <FormItem margin={120} label={''}>
          {/* <Controller
            render={(props) => (
              <AntSwitch
                value="value"
                onChange={(e) => {
                  props.onChange(e.target.checked);
                  onSubmit({
                    ...values,
                    value: e.target.checked
                  });
                }}
                checked={props.value}
              />
            )}
            type="checkbox"
            name="value"
            control={control}
          /> */}
          <AntSwitch
            value="value"
            onChange={(e) => {
              // props.onChange(e.target.checked);
              onSubmit({
                ...values,
                value: e.target.checked
              });
            }}
            checked={checked}
          />
        </FormItem>
      </FormRowContainer>
      <div
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          marginBottom: '20px',
          padding: '20px'
        }}>
        <button
          type="button"
          onClick={handleRemove}
          style={{
            background: '#EEEEEE',
            borderRadius: '4px',
            border: 'none',
            height: '36px',
            width: '90px',
            color: '#5D6E7F',
            fontWeight: 500,
            top: 0,
            marginTop: -10,
            cursor: 'pointer'
          }}>
          Remove
        </button>
      </div>
    </form>
  );
}

export default withSnackbar(FormRowItem);
