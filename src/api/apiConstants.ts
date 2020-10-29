import axios from 'axios';
import { Dispatch } from 'react';
import { SetPayloadActionType } from './useThunkReducer';

const API_URL = 'https://dev.ocomo.io';
const axiosConfig = {
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    Authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGFubWF5IiwiaWF0IjoxNjAzMzY2NTcyLCJleHAiOjE2MDQyMzA1NzIsImlzcyI6Ik9DT01PLUFVVEgtQVBJIiwianRpIjoiVEVTVCJ9.IMeD2SxywigCF3XOBF6iKQHYVVXz9d62QZeDgSVI340',
  },
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
        payload: { data: response.data },
      })
    )
    .catch((error) => dispatch({ type: 'ERROR', payload: { error } }));
};

// TODO: write post data function below

// fetch API axios
export const postData = (
  dispatch: Dispatch<SetPayloadActionType>,
  endpoint: string,
  requestBody: any
) => {
  dispatch({ type: 'LOADING', payload: {} });
  const API_HOST =
    process.env &&
    process.env.NEXT_PUBLIC_APP_URL &&
    !process.env.NEXT_PUBLIC_APP_URL.includes('localhost')
      ? process.env.NEXT_PUBLIC_APP_URL
      : API_URL;
  axios
    .post(`${API_HOST}${getAPIPath(endpoint)}`, requestBody, axiosConfig)
    .then((response) => response)
    .then((response) =>
      dispatch({
        type: 'RESPONSE_COMPLETE',
        payload: { data: response.data },
      })
    )
    .catch((error) => dispatch({ type: 'ERROR', payload: { error } }));
};

// Put data axios
export const updateData = (
  dispatch: Dispatch<SetPayloadActionType>,
  endpoint: string,
  requestBody: any,
  pathVariable: string
) => {
  dispatch({ type: 'LOADING', payload: {} });
  const API_HOST =
    process.env &&
    process.env.NEXT_PUBLIC_APP_URL &&
    !process.env.NEXT_PUBLIC_APP_URL.includes('localhost')
      ? process.env.NEXT_PUBLIC_APP_URL
      : API_URL;
  axios
    .put(`${API_HOST}${getAPIPath(endpoint)}${pathVariable}`, requestBody, axiosConfig)
    .then((response) => response)
    .then((response) =>
      dispatch({
        type: 'RESPONSE_COMPLETE',
        payload: { data: response.data },
      })
    )
    .catch((error) => dispatch({ type: 'ERROR', payload: { error } }));
};

// Delete data axios
export const deleteData = (
  dispatch: Dispatch<SetPayloadActionType>,
  endpoint: string,
  detail: string
) => {
  dispatch({ type: 'LOADING', payload: {} });
  const API_HOST =
    process.env &&
    process.env.NEXT_PUBLIC_APP_URL &&
    !process.env.NEXT_PUBLIC_APP_URL.includes('localhost')
      ? process.env.NEXT_PUBLIC_APP_URL
      : API_URL;
  axios
    .delete(`${API_HOST}${getAPIPath(endpoint)}${detail}`, axiosConfig)
    .then((response) => response)
    .then(() =>
      dispatch({
        type: 'RESPONSE_COMPLETE',
        payload: { data: true },
      })
    )
    .catch((error) => dispatch({ type: 'ERROR', payload: { error } }));
};

export const updateSetData = (
  dispatch: Dispatch<SetPayloadActionType>,
  endpoint: string,
  requestBody: any,
  pathVariable?: string
) => {
  dispatch({ type: 'LOADING', payload: {} });
  const API_HOST =
    process.env &&
    process.env.NEXT_PUBLIC_APP_URL &&
    !process.env.NEXT_PUBLIC_APP_URL.includes('localhost')
      ? process.env.NEXT_PUBLIC_APP_URL
      : API_URL;
  axios
    .put(`${API_HOST}${getAPIPath(endpoint)}${pathVariable}`, requestBody, axiosConfig)
    .then((response) => response)
    .then((response) =>
      dispatch({
        type: 'RESPONSE_COMPLETE',
        payload: { data: response.data },
      })
    )
    .catch((error) => dispatch({ type: 'ERROR', payload: { error } }));
};
