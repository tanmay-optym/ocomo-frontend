import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputTableEdit from './InputTableEdit';

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
      border: 0
    }
  })
)(TableCell);

export default function TableData({
  dataSource = [],
  columns = [],
  rowKey = 'key'
}: TableDataProps): React.FC {
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((colConfig, index) => {
              return <StyledTableCell key={index}>{colConfig.title}</StyledTableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataSource.map((rowData) => (
            <StyledTableRow key={rowData[rowKey]}>
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
                      <InputTableEdit />
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
