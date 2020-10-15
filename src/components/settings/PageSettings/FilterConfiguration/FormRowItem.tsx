import React, { Dispatch, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Switch from '@material-ui/core/Switch';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useSnackbar, VariantType } from 'notistack';
import FormRowContainer from '../../FormRowContainer';
import FormItem from '../../FormItem';
import InputSetting from '../../InputSetting';
import FormLabel from '../../FormLabel';
import FormItemExplainError from '../../FormItemExplainError';
import { deleteData } from '../../../../api/apiConstants';
import {
  reducer,
  SetPayloadActionType,
  useThunkReducer,
} from '../../../../api/useThunkReducer';
import { IFilterConfiguration } from './index';
import useUpdate from '../../../../hooks/useUpdate';
import BtnAction from '../../BtnAction';

const switchHeight = 20;
const switchWidth = 40;

const AntSwitch = withStyles((theme: Theme) => {
  return createStyles({
    root: {
      width: switchWidth,
      height: switchHeight,
      padding: 0,
      display: 'flex',
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
          borderColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: 'none',
    },
    track: {
      border: '3px solid #778899',
      borderRadius: switchHeight / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  });
})(Switch);

type FormRowItemProps = {
  initialValues: IFilterConfiguration;
  onFinish: (values: any) => void;
  onRemove?: (id: string) => void;
  index: number;
};

export default function FormRowItem({
  initialValues,
  onFinish,
  onRemove,
  index,
}: FormRowItemProps): JSX.Element {
  const { register, watch, errors, trigger } = useForm({
    defaultValues: { ...initialValues },
  });
  const { enqueueSnackbar } = useSnackbar();
  const [checked, setChecked] = useState(false);
  const description = watch('description');

  useEffect(() => {
    setChecked(initialValues.value);
  }, [initialValues]);

  const [data, onSubmit] = useUpdate(onFinish, initialValues, 'UI_SETTINGS_FILTER', 'code', index);

  const [dataDelete, dispatchRequest] = useThunkReducer(reducer, {
    error: null,
    loading: false,
    data: null,
  });

  useEffect(() => {
    if (dataDelete.data || dataDelete.error) {
      // window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
      let message = 'Saved';
      let variant: VariantType = 'success';
      if (data.error !== null) {
        message = 'Failed';
        variant = 'error';
      } else if (onRemove) {
        onRemove(initialValues.code);
      }
      enqueueSnackbar(message, {
        variant,
      });
    }
  }, [dataDelete]);

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (onRemove) {
      dispatchRequest((e: Dispatch<SetPayloadActionType>) => {
        deleteData(e, 'UI_SETTINGS_FILTER', `/${initialValues.code}`);
      });
    }
  };

  const onSwitchChange = (valueChecked: boolean) => {
    const values = { value: valueChecked, description: '' };
    if (description) {
      values.description = description;
    } else if (initialValues.description !== '') {
      values.description = initialValues.description;
    } else {
      trigger('description');
    }
    onSubmit(values);
  };
  return (
    <form style={{ display: 'flex' }} key={initialValues.code}>
      <FormRowContainer>
        {initialValues.description !== '' ? (
          <FormLabel style={{ width: 150 }}>{initialValues.description}</FormLabel>
        ) : (
          <FormItem margin={0} label={''}>
            <InputSetting
              style={{ width: 150, marginRight: 0 }}
              name="description"
              refinput={register({ required: 'Reguire' })}
            />
            <FormItemExplainError errors={errors} fieldName={'description'} />
          </FormItem>
        )}
        <FormItem margin={120} label={''}>
          <AntSwitch
            value="value"
            onChange={() => {
              onSwitchChange(!checked);
            }}
            checked={checked}
            disabled={data.loading}
          />
        </FormItem>
      </FormRowContainer>
      <div
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          marginBottom: '20px',
          padding: '20px',
          display: 'flex',
        }}>
        <BtnAction
          loading={dataDelete.loading}
          onClick={(e) => handleRemove(e)}
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
            cursor: 'pointer',
          }}>
          Remove
        </BtnAction>
      </div>
    </form>
  );
}
