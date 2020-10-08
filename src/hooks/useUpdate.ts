import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { updateData } from '../../pages/api/apiConstants';
import { reducer, useThunkReducer, ApiState } from '../../pages/api/useThunkReducer';

const useUpdate = (
  onFinish: (values: object) => void,
  initialValues: object,
  queryString: string,
  key: string
): [ApiState, (values: Object) => void] => {
  const [data, dispatchRequest] = useThunkReducer(reducer, {
    error: null,
    loading: false,
    data: null
  });

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
        onFinish(data.data);
      }
      enqueueSnackbar(message, {
        variant
      });
    }
  }, [data]);

  const onSubmit = (values: Object) => {
    if (onFinish && !data.loading) {
      const dataUpdate = { ...initialValues, ...values };
      dispatchRequest((e) => updateData(e, queryString, dataUpdate, `/${initialValues[key]}`));
    }
  };

  return [data, onSubmit];
};

export default useUpdate;
