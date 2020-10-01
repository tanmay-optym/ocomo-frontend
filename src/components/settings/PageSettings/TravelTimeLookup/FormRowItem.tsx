import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import FormRowContainer from '../../FormRowContainer';
import FormItem from '../../FormItem';
import InputHours from '../../InputHours';
import InputSelectShop, { shopOptions } from '../../InputSelectShop';
import TrendingFlatIcon from '../../SvgIcon/TrendingFlatIcon';
import BtnAction from '../../BtnAction';
import FormItemExplainError from '../../FormItemExplainError';

export default function FormRowItem({ initialValues = {}, onFinish }): React.FC {
  const { register, handleSubmit, control, errors } = useForm({
    defaultValues: {
      ...initialValues,
      shop1: shopOptions[initialValues.shop1],
      shop2: shopOptions[initialValues.shop2]
    }
  });
  const onSubmit = (values) => {
    if (onFinish) {
      onFinish({ ...values, dataIndex: initialValues.dataIndex });
    } else {
      console.log(values);
    }
  };
  return (
    <form key={initialValues.title} onSubmit={handleSubmit(onSubmit)}>
      <FormRowContainer>
        <FormItem margin={0}>
          <Controller name="shop1" as={InputSelectShop} control={control} />
        </FormItem>
        <div style={{ marginTop: 15, marginLeft: 30 }} label={''}>
          <TrendingFlatIcon />
        </div>
        <FormItem label={''}>
          <Controller name="shop2" as={InputSelectShop} control={control} />
        </FormItem>
        <FormItem margin={120} label={''}>
          <InputHours name="estimatedTravelTime" refInput={register({ required: 'Required' })} />
          <FormItemExplainError errors={errors} fieldName={'estimatedTravelTime'} />
        </FormItem>
        <FormItem>
          <BtnAction type="submit">Save</BtnAction>
        </FormItem>
      </FormRowContainer>
    </form>
  );
}
