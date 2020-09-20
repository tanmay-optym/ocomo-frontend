import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

type ColumnsType = {
  key: string;
  title: string;
  dataIndex: string;
};

type TableDataProps = { dataSource: object[]; columns: ColumnsType[]; rowKey: string };

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
              return <TableCell key={index}>{colConfig.title}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataSource.map((rowData) => (
            <TableRow key={rowData[rowKey]}>
              {columns.map((colConfig) => {
                return (
                  <TableCell key={rowData[colConfig.key]}>{rowData[colConfig.dataIndex]}</TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
