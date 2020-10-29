import { useEffect, Dispatch, useState } from 'react';
import { useSnackbar, VariantType } from 'notistack';
import { updateSetData, postData } from './apiConstants';
import { reducer, useThunkReducer, ApiState, SetPayloadActionType } from './useThunkReducer';

const useUpdate = (
  onFinish?: (values: object, index: number) => void,
  initialValues?: object,
  queryString?: string,
  key?: string,
  index?: number,
  onFormatReqBody?: (item: any) => void
): [ApiState, (values: Object) => void] => {
  const [data, dispatchRequest] = useThunkReducer(reducer, {
    error: null,
    loading: false,
    data: null,
  });
  const [dataReq, setDataReq] = useState({});

  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (data.data || data.error) {
      let message = 'Success';
      let variant: VariantType = 'success';
      if (data.error !== null) {
        message = 'Failed';
        variant = 'error';
      } else if (onFinish && index !== undefined) {
        onFinish({ ...dataReq, ...data.data }, index);
      }
      enqueueSnackbar(message, {
        variant,
      });
    }
  }, [data, dataReq]);

  const onSubmit = (values: Object) => {
    if (onFinish && queryString && initialValues) {
      let dataUpdate: any = { ...initialValues, ...values };
      delete dataUpdate.isNew;
      setDataReq({ ...dataUpdate });
      if (onFormatReqBody) {
        dataUpdate = onFormatReqBody(dataUpdate);
      }
      if ((initialValues as any).isNew) {
        dispatchRequest((e: Dispatch<SetPayloadActionType>) =>
          postData(e, queryString, dataUpdate)
        );
      } else {
        dispatchRequest((e: Dispatch<SetPayloadActionType>) =>
          updateSetData(e, queryString, dataUpdate, key ? `/${(initialValues as any)[key]}` : '')
        );
      }
    }
  };

  return [data, onSubmit];
};

export default useUpdate;
