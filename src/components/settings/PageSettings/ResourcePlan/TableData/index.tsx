import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, createStyles } from '@material-ui/core/styles';
import styles from './TableData.module.scss';
import { IResourcePlan } from '../index';
import FormRowItem from './FormRowItem';

export type ColumnsType = {
  key?: string;
  title: string;
  dataIndex: string;
  editable?: boolean;
};

type TableDataProps = {
  dataSource: IResourcePlan[];
  columns: ColumnsType[];
  onRowClick?: (rowData: object) => void;
  onFinish: (values: object) => void;
  onHasErrors: (id: number, hasError: boolean) => void;
};

const StyledTableHeaderCell = withStyles(() =>
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
  onRowClick,
  onFinish,
  onHasErrors
}: TableDataProps): JSX.Element {
  return (
    <TableContainer>
      <Table style={{ maxWidth: '100%', tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow>
            {columns.map((colConfig, index) => {
              return (
                <StyledTableHeaderCell className={styles['header-cell']} key={index}>
                  {colConfig.title}
                </StyledTableHeaderCell>
              );
            })}
            <StyledTableHeaderCell
              style={{ width: 80 }}
              key={'header-cell-action'}></StyledTableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataSource.map((data: IResourcePlan) => (
            <FormRowItem
              columns={columns}
              onRowClick={onRowClick}
              onFinish={onFinish}
              onHasErrors={onHasErrors}
              initialValues={data}
              key={data.id}></FormRowItem>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
