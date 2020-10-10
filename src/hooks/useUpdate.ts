import { useEffect } from 'react';
import { useSnackbar, VariantType } from 'notistack';
import { updateData } from '../../pages/api/apiConstants';
import { reducer, useThunkReducer, ApiState } from '../../pages/api/useThunkReducer';

const useUpdate = (
  onFinish?: (values: object) => void,
  initialValues?: object,
  queryString?: string,
  key?: string
): [ApiState, (values: Object) => void | undefined] => {
  const [data, dispatchRequest] = useThunkReducer(reducer, {
    error: null,
    loading: false,
    data: null
  });

  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (data.data || data.error) {
      let message = 'Saved';
      let variant: VariantType = 'success';
      if (data.error !== null) {
        message = 'Failed';
        variant = 'error';
      } else if (onFinish) {
        onFinish(data.data);
      }
      enqueueSnackbar(message, {
        variant
      });
    }
  }, [data]);

  const onSubmit = (values: Object) => {
    if (onFinish) {
      const dataUpdate = { ...initialValues, ...values };
      if (queryString && initialValues && key) {
        dispatchRequest((e) => updateData(e, queryString, dataUpdate, `/${initialValues[key]}`));
      }
    }
  };

  return [data, onSubmit];
};

export default useUpdate;
