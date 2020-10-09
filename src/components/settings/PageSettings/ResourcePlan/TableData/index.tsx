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
  require?: boolean;
};

type TableDataProps = {
  dataSource: IResourcePlan[];
  columns: ColumnsType[];
  onRowClick?: (rowData: object) => void;
  onFinish: (values: object, index: number) => void;
  onHasErrors: (id: number, hasError: boolean) => void;
};

const StyledTableHeaderCell = withStyles(() =>
  createStyles({
    root: {}
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
              className={styles['header-cell']}
              style={{ width: 80 }}
              key={'header-cell-action'}></StyledTableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataSource.map((data: IResourcePlan, index) => (
            <FormRowItem
              columns={columns}
              onRowClick={onRowClick}
              onFinish={onFinish}
              onHasErrors={onHasErrors}
              initialValues={data}
              key={data.id}
              index={index}></FormRowItem>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
