import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import BtnAction from '../../../BtnAction';
import { IWorkType } from '../index';
import InputTableEdit from './InputTableEdit';
import { ColumnsType } from './index';

type FormRowItemProps = {
  initialValues: IWorkType;
  onFinish: (values: any, index: number) => void;
  onHasErrors: (shopCode: string, hasError: boolean) => void;
  columns: ColumnsType[];
  onRowClick?: (rowData: IWorkType) => void;
  index: number;
};

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 46,
      border: 0,
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

const StyledTableCell = withStyles(() =>
  createStyles({
    root: {
      border: 0,
      fontSize: 12,
      fontWeight: 400,
      color: '#5D6E7F',
      padding: '14px 8px',
    },
  })
)(TableCell);

const styledCellEdit = {
  padding: '6px 8px',
  background: '#EAF1FF',
};

export default function FormRowItem({
  initialValues,
  onFinish,
  onHasErrors,
  columns,
  onRowClick,
  index,
}: FormRowItemProps): JSX.Element {
  const { register, handleSubmit, errors } = useForm({
    mode: 'all',
    defaultValues: { ...initialValues },
  });

  const handleOnRowClick = () => {
    if (onRowClick) {
      onRowClick(initialValues);
    }
  };

  const hasError: boolean = Object.values(errors).length > 0;

  // const [data, onSubmit] = useUpdate(
  //   onFinish,
  //   initialValues,
  //   'CONSTRAINTS_RESOURCE_PLAN',
  //   'shopCode',
  //   index
  // );

  const onSubmit = (values: IWorkType) => {
    if (onFinish) {
      onFinish({ ...initialValues, ...values, editable: false }, index);
    }
  };

  useEffect(() => {
    if (onHasErrors) {
      onHasErrors(initialValues.code, hasError);
    }
  }, [hasError]);

  return (
    <StyledTableRow key={initialValues.code} onClick={handleOnRowClick}>
      {columns.map((colConfig: ColumnsType) => {
        if (!initialValues.editable || !colConfig.editable) {
          return (
            <StyledTableCell
              style={initialValues.editable ? styledCellEdit : { paddingLeft: '16px' }}
              key={colConfig.dataIndex}>
              {(initialValues as any)[colConfig.dataIndex]}
            </StyledTableCell>
          );
        }
        const required = colConfig.require === false ? false : 'Required';
        return (
          <StyledTableCell
            style={initialValues.editable ? styledCellEdit : { paddingLeft: '16px' }}
            key={colConfig.dataIndex}>
            <InputTableEdit name={colConfig.dataIndex} refinput={register({ required })} />
            <div style={{ color: '#fa5c64', position: 'absolute', fontSize: '11px' }}>
              {(errors as any)[colConfig.dataIndex] && (errors as any)[colConfig.dataIndex].message}
            </div>
          </StyledTableCell>
        );
      })}
      <StyledTableCell style={initialValues.editable ? styledCellEdit : { paddingLeft: '16px' }} key="actionSave">
        {initialValues.editable && (
          <BtnAction onClick={handleSubmit(onSubmit)} style={{ height: 32 }} loading={false}>
            Save
          </BtnAction>
        )}
      </StyledTableCell>
    </StyledTableRow>
  );
}
