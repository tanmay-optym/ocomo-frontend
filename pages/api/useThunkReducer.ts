import React, { useReducer, Reducer } from 'react';
import isFunction from 'lodash/isFunction';
import { Recoverable } from 'repl';

export type Action = {
  type: 'LOADING' | 'RESPONSE_COMPLETE' | 'ERROR';
};

interface ApiState {
  error?: Object | string | null;
  loading?: boolean;
  data?: Array<Object> | Object | null;
}
export interface SetPayloadActionType extends Action {
  payload: ApiState;
}

export interface DispatchPayloadType extends Action {
  payload: { data: Array<Object> | Object };
}

export const reducer = (state: ApiState, action: SetPayloadActionType): ApiState => {
  if (action.type === 'LOADING') {
    return {
      data: null,
      loading: true,
      error: null
    };
  }

  if (action.type === 'RESPONSE_COMPLETE') {
    return {
      data: action.payload.data,
      loading: false,
      error: null
    };
  }

  if (action.type === 'ERROR') {
    return {
      data: null,
      loading: false,
      error: action.payload.error
    };
  }

  return state;
};

export const initialState = {
  error: null,
  loading: false,
  data: []
};

export const useThunkReducer = (reducer: Reducer<any, any>, initialState: ApiState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const enhancedDispatch = React.useCallback(
    (action) => {
      if (isFunction(action)) {
        action(dispatch);
      } else {
        dispatch(action);
      }
    },
    [dispatch]
  );

  return [state, enhancedDispatch];
};

/*
const [shopSaveState, dispatchShopState] = useThunkReducer(reducer, {
    error: null,
    loading: false,
    data: null
  });

   dispatchShopState((e) => postData(e, "SAVE_SHOP_DETAILS", putBody));
*/

/*
  const [shopsState, dispatchRequest] = useThunkReducer(reducer, initialState);
    dispatchRequest((e) =>
      fetchData(e, "ShopsGrid", `startDate=${formatStartDate}&endDate=${formatEndDate}`)
*/
