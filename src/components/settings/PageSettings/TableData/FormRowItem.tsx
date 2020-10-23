import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import BtnAction from '../../BtnAction';
import InputTableEdit from './InputTableEdit';
import { ColumnsType } from './index';
import useUpdate from '../../../../api/useUpdate';

type FormRowItemProps = {
  initialValues: any;
  onFinish: (values: any, index: number) => void;
  onHasErrors: (index: number, hasError: boolean) => void;
  onHasChanges: (index: number, hasError: boolean) => void;
  columns: ColumnsType[];
  onRowClick?: (rowData: any, index: number) => void;
  index: number;
  queryString: string;
  pathVariableKey: string;
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
      cursor: 'pointer',
    },
  })
)(TableCell);

const styledCellEdit = {
  padding: '6px 8px',
  background: '#EAF1FF',
};

export default React.memo(
  ({
    initialValues,
    onFinish,
    onHasErrors,
    onHasChanges,
    columns,
    onRowClick,
    index,
    queryString,
    pathVariableKey,
  }: FormRowItemProps) => {
    const { register, handleSubmit, errors, formState, watch, reset } = useForm({
      // mode: 'all',
      defaultValues: { ...initialValues },
    });
    const [hiddenBtnSave, setHiddenBtnSave] = useState(true);

    const values = watch();

    const handleOnRowClick = () => {
      if (initialValues.editable || !onRowClick) {
        return;
      }
      onRowClick(initialValues, index);
    };

    const handleSaveSuccess = (resData: any) => {
      onFinish(resData, index);
      reset();
    };

    useEffect(() => {
      if (initialValues.editable) {
        reset(initialValues);
      }
    }, [initialValues.editable]);

    const hasError: boolean = Object.values(errors).length > 0;

    const [data, onSubmit] = useUpdate(
      handleSaveSuccess,
      initialValues,
      queryString,
      pathVariableKey,
      index
    );

    useEffect(() => {
      if (onHasErrors) {
        onHasErrors(initialValues.id, hasError);
      }
    }, [hasError]);

    useEffect(() => {
      if (!initialValues.editable || !formState.isDirty) {
        return;
      }
      const wasChange = Object.entries(values).some(([key, v]) => {
        const result = (initialValues[key] || '').toString() !== `${v}`;
        return result;
      });
      setHiddenBtnSave(!wasChange);
      if (onHasChanges) {
        onHasChanges(index, wasChange);
      }
    }, [initialValues, values, formState.isDirty]);

    const getColStyle = (colConfig: ColumnsType) => {
      let colStyle = {};
      if (initialValues.editable) {
        colStyle = { ...colStyle, ...styledCellEdit };
      }
      if (colConfig.width) {
        colStyle = { ...colStyle, width: colConfig.width };
      }
      return colStyle;
    };

    return (
      <StyledTableRow key={initialValues.id} onClick={handleOnRowClick}>
        {columns.map((colConfig: ColumnsType) => {
          if (!initialValues.editable || !colConfig.editable) {
            return (
              <StyledTableCell style={getColStyle(colConfig)} key={colConfig.dataIndex}>
                {(initialValues as any)[colConfig.dataIndex]}
              </StyledTableCell>
            );
          }
          const required = colConfig.require === false ? false : 'Required';
          return (
            <StyledTableCell style={getColStyle(colConfig)} key={colConfig.dataIndex}>
              <InputTableEdit
                style={{ width: '100%', ...(colConfig.inputStyle || {}) }}
                name={colConfig.dataIndex}
                refinput={register({ required, ...(colConfig.registerOption || {}) })}
              />

              {(errors as any)[colConfig.dataIndex] && (
                <div
                  style={{
                    color: '#fa5c64',
                    fontSize: '11px',
                    marginBottom: -12,
                    display: 'block',
                  }}>
                  {(errors as any)[colConfig.dataIndex].message}
                </div>
              )}
            </StyledTableCell>
          );
        })}
        <StyledTableCell style={initialValues.editable ? styledCellEdit : {}} key="actionSave">
          {initialValues.editable && !hiddenBtnSave && (
            <BtnAction
              onClick={handleSubmit(onSubmit)}
              style={{ height: 32 }}
              loading={data.loading}>
              {initialValues.isNew ? 'Add' : 'Save'}
            </BtnAction>
          )}
        </StyledTableCell>
      </StyledTableRow>
    );
  }
);
