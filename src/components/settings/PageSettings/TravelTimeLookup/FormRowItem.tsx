import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import FormRowContainer from '../../FormRowContainer';
import FormItem from '../../FormItem';
import InputHours from '../../InputHours';
import InputSelectShop, { IShop } from '../../InputSelectShop';
import TrendingFlatIcon from '../../SvgIcon/TrendingFlatIcon';
import BtnAction from '../../BtnAction';
import FormItemExplainError from '../../FormItemExplainError';
import { ITravelTimeLookup } from './index';

type FormRowItemProps = {
  initialValues: ITravelTimeLookup;
  onFinish: (values: object) => void;
  shopOptions: IShop[];
};

export default function FormRowItem({
  initialValues,
  onFinish,
  shopOptions
}: FormRowItemProps): JSX.Element {
  const { register, handleSubmit, control, errors } = useForm({
    defaultValues: {
      ...initialValues,
      shopCode1: shopOptions.find((item) => item.value === initialValues.shopCode1),
      shopCode2: shopOptions.find((item) => item.value === initialValues.shopCode2)
    }
  });
  const onSubmit = (values) => {
    if (onFinish) {
      onFinish({ ...initialValues, ...values });
    }
  };
  return (
    <form key={initialValues.id} onSubmit={handleSubmit(onSubmit)}>
      <FormRowContainer>
        <FormItem margin={0}>
          <Controller
            name="shopCode1"
            as={<InputSelectShop shopOptions={shopOptions} />}
            control={control}
          />
        </FormItem>
        <div style={{ marginTop: 15, marginLeft: 30 }}>
          <TrendingFlatIcon />
        </div>
        <FormItem label={''}>
          <Controller
            name="shopCode2"
            as={<InputSelectShop shopOptions={shopOptions} />}
            control={control}
          />
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
