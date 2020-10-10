import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import BtnAction from '../../../BtnAction';
import { IResourcePlan } from '../index';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import InputTableEdit from './InputTableEdit';
import { ColumnsType } from './index';
import useUpdate from '../../../../../hooks/useUpdate';

type FormRowItemProps = {
  initialValues: IResourcePlan;
  onFinish: (values: object, index: number) => void;
  onHasErrors: (id: number, hasError: boolean) => void;
  columns: ColumnsType[];
  onRowClick?: (rowData: IResourcePlan) => void;
  index: number;
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

export default function FormRowItem({
  initialValues,
  onFinish,
  onHasErrors,
  columns,
  onRowClick,
  index
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

  const hasError: boolean = Object.values(errors).length > 0;

  const [data, onSubmit] = useUpdate(
    onFinish,
    initialValues,
    'CONSTRAINTS_RESOURCE_PLAN',
    'shopCode',
    index
  );

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
          const required = colConfig.require === false ? false : 'Required';
          return (
            <StyledTableCell
              style={initialValues.editable ? styledCellEdit : {}}
              key={colConfig.dataIndex}>
              <InputTableEdit name={colConfig.dataIndex} refInput={register({ required })} />
              <div style={{ color: '#fa5c64', position: 'absolute', fontSize: '11px' }}>
                {errors[colConfig.dataIndex] && errors[colConfig.dataIndex].message}
              </div>
            </StyledTableCell>
          );
        }
      })}
      <StyledTableCell style={initialValues.editable ? styledCellEdit : {}} key="actionSave">
        {initialValues.editable && (
          <BtnAction onClick={handleSubmit(onSubmit)} style={{ height: 32 }} loading={data.loading}>
            Save
          </BtnAction>
        )}
      </StyledTableCell>
    </StyledTableRow>
  );
}
