import { useEffect } from 'react';
import { useSnackbar, VariantType } from 'notistack';
import { updateData, postData } from '../../pages/api/apiConstants';
import { reducer, useThunkReducer, ApiState } from '../../pages/api/useThunkReducer';

const useUpdate = (
  onFinish?: (values: object, index: number) => void,
  initialValues?: object,
  queryString?: string,
  key?: string,
  index?: number
): [ApiState, (values: Object) => void] => {
  const [data, dispatchRequest] = useThunkReducer(reducer, {
    error: null,
    loading: false,
    data: null
  });

  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (data.data || data.error) {
      let message = 'Success';
      let variant: VariantType = 'success';
      if (data.error !== null) {
        message = 'Failed';
        variant = 'error';
      } else if (onFinish && index != undefined) {
        onFinish(data.data, index);
      }
      enqueueSnackbar(message, {
        variant
      });
    }
  }, [data]);

  const onSubmit = (values: Object) => {
    if (onFinish && queryString && initialValues && key) {
      const dataUpdate = { ...initialValues, ...values };
      delete dataUpdate['isNew'];
      if (initialValues['isNew']) dispatchRequest((e) => postData(e, queryString, dataUpdate));
      else dispatchRequest((e) => updateData(e, queryString, dataUpdate, `/${initialValues[key]}`));
    }
  };

  return [data, onSubmit];
};

export default useUpdate;
