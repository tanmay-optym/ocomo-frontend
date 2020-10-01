import React, { Fragment } from 'react';
import { useForm, Controller } from 'react-hook-form';
import FormRowContainer from '../../FormRowContainer';
import FormItem from '../../FormItem';
import InputSetting from '../../InputSetting';
import FormLabel from '../../FormLabel';
import BtnAction from '../../BtnAction';
import FormItemExplainError from '../../FormItemExplainError';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';

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

export default function FormRowItem({ initialValues, onFinish, onRemove }): React.FC {
  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: { ...initialValues }
  });

  const onSubmit = (values) => {
    console.log(values);
    if (onFinish) {
      onFinish({ ...values, dataIndex: initialValues.dataIndex });
    }
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove(initialValues);
    }
  };
  return (
    <form
      style={{ display: 'flex' }}
      key={initialValues.dataIndex}
      onSubmit={handleSubmit(onSubmit)}>
      <FormRowContainer>
        {initialValues.name !== '' ? (
          <Fragment>
            <FormLabel style={{ width: 150 }}>{initialValues.name}</FormLabel>
            <FormItem label={''}>
              <InputSetting type="hidden" name="name" refInput={register()} />
            </FormItem>
          </Fragment>
        ) : (
          <FormItem margin={0} label={''}>
            <InputSetting
              style={{ width: 150, marginRight: 10 }}
              name="name"
              refInput={register({ required: 'Required' })}
            />
            <FormItemExplainError errors={errors} fieldName={'name'} />
          </FormItem>
        )}
        <FormItem margin={120} label={''}>
          <Controller
            render={(props) => (
              <AntSwitch
                value="test"
                onChange={(e) => props.onChange(e.target.checked)}
                checked={props.value}
              />
            )}
            type="checkbox"
            name="value"
            control={control}
          />
          {/* <InputSetting name="value" refInput={register({ required: 'Required' })} /> */}
        </FormItem>
        <FormItem>
          <BtnAction type="submit">Save</BtnAction>
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
            left: '900px',
            top: '179px',
            borderRadius: '4px',
            color: '#5D6E7F',
            fontWeight: '500',
            top: '0',
            marginTop: '-10px',
            cursor: 'pointer'
          }}>
          Remove
        </button>
      </div>
    </form>
  );
}
