import { useEffect, Dispatch } from 'react';
import { useSnackbar, VariantType } from 'notistack';
import { updateData, postData } from '../../pages/api/apiConstants';
import {
  reducer,
  useThunkReducer,
  ApiState,
  SetPayloadActionType
} from '../../pages/api/useThunkReducer';

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
      const dataUpdate: any = { ...initialValues, ...values };
      delete dataUpdate['isNew'];
      if ((initialValues as any)['isNew'])
        dispatchRequest((e: Dispatch<SetPayloadActionType>) =>
          postData(e, queryString, dataUpdate)
        );
      else
        dispatchRequest((e: Dispatch<SetPayloadActionType>) =>
          updateData(e, queryString, dataUpdate, `/${(initialValues as any)[key]}`)
        );
    }
  };

  return [data, onSubmit];
};

export default useUpdate;
