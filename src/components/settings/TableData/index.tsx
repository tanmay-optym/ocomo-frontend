import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputTableEdit from './InputTableEdit';
import styles from './TableData.module.scss';
import { useForm } from 'react-hook-form';

type ColumnsType = {
  key: string;
  title: string;
  dataIndex: string;
};

type TableDataProps = { dataSource: object[]; columns: ColumnsType[]; rowKey: string };

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

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    root: {
      border: 0,
      fontSize: 12,
      fontWeight: 400,
      color: '#5D6E7F'
    }
  })
)(TableCell);

const StyledTableHeaderCell = withStyles((theme: Theme) =>
  createStyles({
    root: {
      border: 0,
      fontSize: 12,
      fontWeight: 600,
      color: '#5D6E7F'
    }
  })
)(TableCell);

export default function TableData({
  dataSource = [],
  columns = [],
  rowKey = 'key',
  onRowClick,
  onBlurInput
}: TableDataProps): React.FC {
  const [valueChange, setValueChange] = useState({});

  const hasError = Object.values(valueChange).some((rowData) => {
    return Object.values(rowData).some((data) => data === '');
  });
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((colConfig, index) => {
              return (
                <StyledTableHeaderCell className={styles['header-cell']} key={index}>
                  {colConfig.title}
                </StyledTableHeaderCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataSource.map((rowData) => (
            <StyledTableRow
              key={rowData[rowKey]}
              onClick={() => {
                if (hasError) {
                  return;
                }
                if (onRowClick) {
                  onRowClick(rowData);
                }
              }}>
              {columns.map((colConfig) => {
                if (!rowData.editable || !colConfig.editable) {
                  return (
                    <StyledTableCell key={rowData[colConfig.key]}>
                      {rowData[colConfig.dataIndex]}
                    </StyledTableCell>
                  );
                } else {
                  return (
                    <StyledTableCell key={rowData[colConfig.key]}>
                      <InputTableEdit
                        onBlur={(e) => {
                          if (onBlurInput) {
                            setValueChange({
                              ...valueChange,
                              [rowData.id]: { [colConfig.dataIndex]: e.target.value }
                            });
                            onBlurInput(rowData, { [colConfig.dataIndex]: e.target.value });
                          }
                        }}
                        defaultValue={rowData[colConfig.dataIndex]}
                      />
                      <div style={{ color: '#fa5c64', position: 'absolute', fontSize: '11px' }}>
                        {valueChange[rowData.id] &&
                          valueChange[rowData.id][colConfig.dataIndex] === '' &&
                          'Required'}
                      </div>
                    </StyledTableCell>
                  );
                }
              })}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
