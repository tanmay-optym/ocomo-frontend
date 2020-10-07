import axios from 'axios';
import { Dispatch } from 'react';
import { SetPayloadActionType, DispatchPayloadType } from './useThunkReducer';

const API_URL = 'https://dev.ocomo.io';
const axiosConfig = {
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json'
  }
};

const getAPIPath = (endpoint: string) => {
  switch (endpoint) {
    case 'LocomotivesGrid':
      return '/stp/locomotive/list?';
    case 'LocomotiveDetailsGrid':
      return '/stp/locomotive/notificationDetails?LocoIds=';
    case 'QuickFilters':
      return '/stp/locomotives/quickFilters';
    case 'LocomotivesKpi':
      return '/stp/locomotives/kpi?';
    case 'ShopsGrid':
      return '/stp/shop/list?';
    case 'ShopsKpi':
      return '/stp/shop/kpi?';
    case 'ShopDetailsGrid':
      return '/stp/shop/shopDetails?';
    case 'OPTIMIZE':
      return '/stp/engine/optimize?';
    case 'SAVE_SHOP_DETAILS':
      return '/stp/shop/shopDetails';
    case 'CONSTRAINTS_RESOURCE_PLAN':
      return '/stp/constraints/resourcePlan';
    case 'CONSTRAINTS_SWH':
      return '/stp/constraints/swh';
    case 'CONSTRAINTS_TTL':
      return '/stp/constraints/ttl';
    case 'CONSTRAINTS_ADP':
      return '/stp/constraints/adp';
    case 'UI_SETTINGS_ADP':
      return '/stp/uiSettings/alert';
    case 'UI_SETTINGS_FILTER':
      return '/stp/uiSettings/filter';
    case 'UI_SETTINGS_KPI':
      return '/stp/uiSettings/kpi';
    default:
      return '';
  }
};

// fetch API axios
export const fetchData = (
  dispatch: Dispatch<SetPayloadActionType>,
  endpoint: string,
  queryString: string
) => {
  dispatch({ type: 'LOADING', payload: {} });
  const API_HOST =
    process.env &&
    process.env.NEXT_PUBLIC_APP_URL &&
    !process.env.NEXT_PUBLIC_APP_URL.includes('localhost')
      ? process.env.NEXT_PUBLIC_APP_URL
      : API_URL;

  axios
    .get(`${API_HOST}${getAPIPath(endpoint)}${queryString}`, axiosConfig)
    .then((response) => response)
    .then((response) =>
      dispatch({
        type: 'RESPONSE_COMPLETE',
        payload: { data: response.data }
      })
    )
    .catch((error) => dispatch({ type: 'ERROR', payload: { error } }));
};

//TODO: write post data function below

// fetch API axios
export const postData = (
  dispatch: Dispatch<SetPayloadActionType>,
  endpoint: string,
  requestBody: any
) => {
  dispatch({ type: 'LOADING', payload: {} });

  axios
    .put(`${process.env.NEXT_PUBLIC_APP_URL}${getAPIPath(endpoint)}`, requestBody, axiosConfig)
    .then((response) => response)
    .then((response) =>
      dispatch({
        type: 'RESPONSE_COMPLETE',
        payload: { data: response.data }
      })
    )
    .catch((error) => dispatch({ type: 'ERROR', payload: { error } }));
};
