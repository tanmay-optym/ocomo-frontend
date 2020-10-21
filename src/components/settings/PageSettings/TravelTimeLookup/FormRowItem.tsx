import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import FormRowContainer from '../../FormRowContainer';
import FormItem from '../../FormItem';
import InputHours from '../../InputHours';
import InputSelectShop, { IShop } from '../../InputSelectShop';
import TrendingFlatIcon from '../../SvgIcon/TrendingFlatIcon';
import FormItemExplainError from '../../FormItemExplainError';
import { ITravelTimeLookup } from './index';
import FormItemActionSave from '../../FormItemActionSave';

type FormRowItemProps = {
  initialValues: ITravelTimeLookup;
  onFinish: (values: any) => void;
  shopOptions: IShop[];
};

export default function FormRowItem({
  initialValues,
  onFinish,
  shopOptions,
}: FormRowItemProps): JSX.Element {
  const { register, handleSubmit, control, errors, watch, formState } = useForm({
    defaultValues: {
      ...initialValues,
      shopCode1: shopOptions.find((item) => item.value === initialValues.shopCode1),
      shopCode2: shopOptions.find((item) => item.value === initialValues.shopCode2),
    },
  });
  const onSubmit = (values: any) => {
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
          <InputHours name="estimatedTravelTime" refinput={register({ required: 'Required' })} />
          <FormItemExplainError errors={errors} fieldName={'estimatedTravelTime'} />
        </FormItem>
        <FormItemActionSave
          initialValues={initialValues}
          values={watch()}
          isDirty={formState.isDirty}
          loading={false}
        />
      </FormRowContainer>
    </form>
  );
}
