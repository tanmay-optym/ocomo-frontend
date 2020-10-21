import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import { CSVLink } from 'react-csv';
import TableData from './TableData';

import Card from '../../Card';
import CardHeader from '../../CardHeader';
import Spin from '../../Spin';
import PageBody from '../../PageBody';

export type IWorkType = {
  code: string;
  workType: string;
  workDuration: number,
  cost: string;
  editable?: boolean
};

const columns = [
  { title: 'Work Type', dataIndex: 'workType', editable: true },
  { title: 'Work Duration', dataIndex: 'workDuration', editable: true },
  {
    title: 'Cost',
    dataIndex: 'cost',
    editable: true,
  },
];

export default function WorkType(): JSX.Element {
  const [dataSource, setDataSource] = useState<IWorkType[]>([]);

  const headersCSV = [
    { label: 'Work Type', key: 'workType' },
    { label: 'Work Duration', key: 'workDuration' },
    { label: 'Cost', key: 'cost' },
  ];

  const [dataErrors, setDataErrors] = useState({});

  useEffect(() => {
    const fakeData: IWorkType[] = [
      {
        code: 'TRN',
        workType: 'Test',
        workDuration: 6,
        cost: '$123,456',
      }
    ];
    setDataSource(fakeData);
  }, []);

  const handleRowClick = (rowData: IWorkType) => {
    const hasRowError = Object.values(dataErrors).some((hasError) => hasError);
    if (hasRowError) {
      return;
    }
    const hasEditing = Object.values(dataSource).some((dataItem) => dataItem.editable);
    if (hasEditing) {
      return;
    }
    const rowIndex = dataSource.findIndex((dataItem) => dataItem.code === rowData.code);
    const dataItem = dataSource[rowIndex];
    const newDataSource = [...dataSource];
    newDataSource[rowIndex] = { ...dataItem, editable: true };
    setDataSource(newDataSource);
  };

  const handleHasErrors = (shopCode: string, hasError: boolean) => {
    setDataErrors({ ...dataErrors, [shopCode]: hasError });
  };

  const handleSaveData = (resData: any, index: number) => {
    // const rowDataIndex = dataSource.findIndex((item) => item.code === data.code);
    const newDataSource = [...dataSource];
    newDataSource[index] = resData;
    console.log(newDataSource, index);
    setDataSource(newDataSource);
  };

  return (
    <Card>
      <CardHeader
        title={'Work Type'}
        rightAction={
          <CSVLink filename={'work-type.csv'} data={dataSource} headers={headersCSV}>
            <Button>
              <GetAppOutlinedIcon />
            </Button>
          </CSVLink>
        }
      />
      <PageBody>
        <Spin spinning={false}>
          <TableData
            onRowClick={handleRowClick}
            dataSource={dataSource}
            columns={columns}
            onFinish={handleSaveData}
            onHasErrors={handleHasErrors}
          />
        </Spin>
      </PageBody>
    </Card>
  );
}
