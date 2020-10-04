import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import BtnAction from '../../../BtnAction';
import { IResourcePlan } from '../index';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import InputTableEdit from './InputTableEdit';
import { ColumnsType } from './index';

type FormRowItemProps = {
  initialValues: IResourcePlan;
  onFinish: (values: object) => void;
  onHasErrors: (id: number, hasError: boolean) => void;
  columns: ColumnsType[];
  onRowClick?: (rowData: IResourcePlan) => void;
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
      color: '#5D6E7F'
    }
  })
)(TableCell);

export default function FormRowItem({
  initialValues,
  onFinish,
  onHasErrors,
  columns,
  onRowClick
}: FormRowItemProps): JSX.Element {
  const { register, handleSubmit, errors } = useForm({
    mode: 'all',
    defaultValues: { ...initialValues }
  });

  const handleOnRowClick = () => {
    if (onRowClick) {
      onRowClick(initialValues);
    }
  };

  const onSubmit = (values) => {
    if (onFinish) {
      onFinish({ ...initialValues, ...values });
    }
  };
  const hasError: boolean = Object.values(errors).length > 0;

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
            <StyledTableCell key={colConfig.dataIndex}>
              {initialValues[colConfig.dataIndex]}
            </StyledTableCell>
          );
        } else {
          return (
            <StyledTableCell key={colConfig.dataIndex}>
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
      <StyledTableCell key="actionSave">
        {initialValues.editable && (
          <BtnAction onClick={handleSubmit(onSubmit)} style={{ height: 32 }}>
            Save
          </BtnAction>
        )}
      </StyledTableCell>
    </StyledTableRow>
  );
}
