import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { updateData, postData } from '../../pages/api/apiConstants';
import { reducer, useThunkReducer, ApiState } from '../../pages/api/useThunkReducer';

const useUpdate = (
  onFinish: (values: object, index: number) => void,
  initialValues: object,
  queryString: string,
  key: string,
  index: number,
  setValue?: (name: string, index: any) => void
): [ApiState, (values: Object) => void] => {
  const [data, dispatchRequest] = useThunkReducer(reducer, {
    error: null,
    loading: false,
    data: null
  });

  useEffect(() => {
    if (setValue)
      Object.keys(initialValues).map((item) => {
        setValue(item, initialValues[item]);
      });
  }, [initialValues]);

  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (data.data || data.error) {
      window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
      let message = 'Saved';
      let variant = 'success';
      if (data.error !== null) {
        message = 'Failed';
        variant = 'error';
      } else if (onFinish) {
        onFinish(data.data, index);
      }
      enqueueSnackbar(message, {
        variant
      });
    }
  }, [data]);

  const onSubmit = (values: Object) => {
    if (onFinish) {
      const dataUpdate = { ...initialValues, ...values };
      console.log(dataUpdate);
      delete dataUpdate['isNew'];
      if (initialValues['isNew']) dispatchRequest((e) => postData(e, queryString, dataUpdate));
      else dispatchRequest((e) => updateData(e, queryString, dataUpdate, `/${initialValues[key]}`));
    }
  };

  return [data, onSubmit];
};

export default useUpdate;
