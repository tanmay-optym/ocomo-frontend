import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { withSnackbar, SnackbarMessage, SnackbarKey, OptionsObject } from 'notistack';
import BtnAction from '../../../BtnAction';
import { IResourcePlan } from '../index';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import InputTableEdit from './InputTableEdit';
import { ColumnsType } from './index';
import Spin from '../../../Spin/Circular';
import { updateData } from '../../../../../../pages/api/apiConstants';
import { reducer, useThunkReducer } from '../../../../../../pages/api/useThunkReducer';

type FormRowItemProps = {
  initialValues: IResourcePlan;
  onFinish: (values: object) => void;
  onHasErrors: (id: number, hasError: boolean) => void;
  columns: ColumnsType[];
  onRowClick?: (rowData: IResourcePlan) => void;
  enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey;
};

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 46,
      border: 0,
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
      }
    }
  })
)(TableRow);

const StyledTableCell = withStyles(() =>
  createStyles({
    root: {
      border: 0,
      fontSize: 12,
      fontWeight: 400,
      color: '#5D6E7F',
      padding: '14px 8px'
    }
  })
)(TableCell);

const styledCellEdit = {
  padding: '6px 8px',
  background: '#EAF1FF'
};

function FormRowItem({
  initialValues,
  onFinish,
  onHasErrors,
  columns,
  onRowClick,
  enqueueSnackbar
}: FormRowItemProps): JSX.Element {
  const { register, handleSubmit, errors } = useForm({
    mode: 'all',
    defaultValues: { ...initialValues }
  });

  const [data, dispatchRequest] = useThunkReducer(reducer, {
    error: null,
    loading: false,
    data: null
  });

  const handleOnRowClick = () => {
    if (onRowClick) {
      onRowClick(initialValues);
    }
  };

  const onSubmit = (values) => {
    if (onFinish) {
      const dataUpdate = { ...initialValues, ...values };
      dispatchRequest((e) =>
        updateData(e, 'CONSTRAINTS_RESOURCE_PLAN', dataUpdate, `/${initialValues.shopCode}`)
      );
    }
  };
  const hasError: boolean = Object.values(errors).length > 0;

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
      enqueueSnackbar(message, { variant });
    }
  }, [data]);

  useEffect(() => {
    if (onHasErrors) {
      onHasErrors(initialValues.id, hasError);
    }
  }, [hasError]);

  return (
    <StyledTableRow key={initialValues.id} onClick={handleOnRowClick}>
      {columns.map((colConfig: ColumnsType) => {
        if (!initialValues.editable || !colConfig.editable) {
          return (
            <StyledTableCell
              style={initialValues.editable ? styledCellEdit : {}}
              key={colConfig.dataIndex}>
              {initialValues[colConfig.dataIndex]}
            </StyledTableCell>
          );
        } else {
          return (
            <StyledTableCell
              style={initialValues.editable ? styledCellEdit : {}}
              key={colConfig.dataIndex}>
              <InputTableEdit
                name={colConfig.dataIndex}
                refInput={register({ required: 'Required' })}
              />
              <div style={{ color: '#fa5c64', position: 'absolute', fontSize: '11px' }}>
                {errors[colConfig.dataIndex] && errors[colConfig.dataIndex].message}
              </div>
            </StyledTableCell>
          );
        }
      })}
      <StyledTableCell style={initialValues.editable ? styledCellEdit : {}} key="actionSave">
        {initialValues.editable && (
          <BtnAction onClick={handleSubmit(onSubmit)} style={{ height: 32 }}>
            <Spin spinning={data.loading} style={{ width: '26px', height: '26px' }}>
              Save
            </Spin>
          </BtnAction>
        )}
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default withSnackbar(FormRowItem);
