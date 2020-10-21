import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, createStyles } from '@material-ui/core/styles';
import styles from './TableData.module.scss';
import FormRowItem from './FormRowItem';

export type ColumnsType = {
  key?: string;
  title: string;
  dataIndex: string;
  editable?: boolean;
  require?: boolean;
  width?: number;
  inputStyle?: React.CSSProperties;
};

type TableDataProps = {
  initialData: any[];
  columns: ColumnsType[];
  queryString: string;
  pathVariableKey: string;
  onFinish: (values: any, index: number) => void;
  colActionStyle?: React.CSSProperties;
};

const StyledTableHeaderCell = withStyles(() =>
  createStyles({
    root: {},
  })
)(TableCell);

export default function TableData({
  initialData = [],
  columns = [],
  queryString,
  pathVariableKey,
  colActionStyle,
  onFinish,
}: TableDataProps): JSX.Element {
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [dataErrors, setDataErrors] = useState<any>({});
  const [dataChanges, setDataChanges] = useState<any>({});

  const getDataAddNewRow = (data: any) => {
    const hasNewItem = data.length > 0 && data[data.length - 1].isNew === true;
    if (hasNewItem) {
      return data;
    }
    return [
      ...data,
      {
        [pathVariableKey]: Math.round(new Date().getTime() / 1000).toString(),
        isNew: true,
        editable: true,
      },
    ];
  };

  useEffect(() => {
    setDataSource(getDataAddNewRow(initialData || []));
  }, [initialData]);

  const handleRowClick = (rowData: any, rowIndex: number) => {
    const hasRowError = Object.values(dataErrors).some((hasError) => hasError);
    if (hasRowError) {
      return;
    }
    const hasRowChanges = Object.values(dataChanges).some((hasChange) => hasChange);
    if (hasRowChanges) {
      return;
    }
    const dataItem: any = dataSource[rowIndex];
    if (dataItem.editable === true) {
      return;
    }
    const newDataSource: any[] = [...dataSource];
    const editingRowIndex = newDataSource.findIndex((item: any) => !item.isNew && item.editable);
    if (editingRowIndex > -1) {
      const editingRow = newDataSource[editingRowIndex];
      newDataSource[editingRowIndex] = { ...editingRow, editable: false };
    }
    newDataSource[rowIndex] = { ...dataItem, editable: true };
    setDataSource(newDataSource);
  };

  const handleHasErrors = (id: number | string, hasError: boolean) => {
    setDataErrors({ ...dataErrors, [id]: hasError });
  };

  const handleHasChanges = (index: number | string, hasChange: boolean) => {
    if (dataChanges[index] !== hasChange) {
      setDataChanges({ ...dataChanges, [index]: hasChange });
    }
  };

  const handleSaveData = (resData: any, index: number) => {
    const newDataSource = [...dataSource];
    newDataSource[index] = { ...newDataSource[index], ...resData, editable: false, isNew: false };
    setDataSource(getDataAddNewRow(newDataSource));
    setDataErrors({});
    setDataChanges({});
    onFinish(resData, index);
  };

  const getColStyle = (colConfig: ColumnsType) => {
    let colStyle = {};
    if (colConfig.width) {
      colStyle = { ...colStyle, width: colConfig.width };
    }
    return colStyle;
  };

  return (
    <TableContainer>
      <Table style={{ maxWidth: '100%', tableLayout: 'fixed', marginBottom: 20 }}>
        <TableHead>
          <TableRow>
            {columns.map((colConfig, index) => {
              return (
                <StyledTableHeaderCell
                  style={getColStyle(colConfig)}
                  className={styles['header-cell']}
                  key={index.toString()}>
                  {colConfig.title}
                </StyledTableHeaderCell>
              );
            })}
            <StyledTableHeaderCell
              className={styles['header-cell']}
              style={{ width: 80, ...(colActionStyle || {}) }}
              key={'header-cell-action'}
            />
          </TableRow>
        </TableHead>
        <TableBody>
          {dataSource.map((data: any, index) => (
            <FormRowItem
              columns={columns}
              onRowClick={handleRowClick}
              onFinish={handleSaveData}
              onHasErrors={handleHasErrors}
              onHasChanges={handleHasChanges}
              initialValues={data}
              key={index.toString()}
              index={index}
              queryString={queryString}
              pathVariableKey={pathVariableKey}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
