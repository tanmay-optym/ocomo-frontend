import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import { CSVLink } from 'react-csv';
import TableData from './TableData';

import Card from '../../Card';
import CardHeader from '../../CardHeader';
import Spin from '../../Spin';
import PageBody from '../../PageBody';

export type IShopPlan = {
  shopCode: string;
  type: string;
  maxSlot?: number;
  prohibitedModel?: string;
  prohibitedWorkType?: string;
  shopDesirability?: string;
  costPerLoco?: string;
  costPerSlot?: string;
  editable?: boolean;
};

const columns = [
  { title: 'Shop', dataIndex: 'shopCode' },
  { title: 'Type', dataIndex: 'type', editable: true },
  {
    title: 'Max # of Slots',
    dataIndex: 'maxSlot',
    editable: true,
  },
  {
    title: 'Prohibited Model',
    dataIndex: 'prohibitedModel',
    editable: true,
    require: false,
  },
  {
    title: 'Prohibited Work Type',
    dataIndex: 'prohibitedWorkType',
    editable: true,
    require: false,
  },
  {
    title: 'Shop Desirability',
    dataIndex: 'shopDesirability',
    editable: true,
    require: false,
  },
  {
    title: 'Cost per Loco',
    dataIndex: 'costPerLoco',
    editable: true,
    require: false,
  },
  {
    title: 'Cost per Slot',
    dataIndex: 'costPerSlot',
    editable: true,
    require: false,
  },
];

export default function ShopPlan(): JSX.Element {
  const [dataSource, setDataSource] = useState<IShopPlan[]>([]);

  const headersCSV = [
    { label: 'Shop', key: 'shopCode' },
    { label: 'Type', key: 'type' },
    { label: 'Max # of Slots', key: 'maxSlot' },
    { label: 'Prohibited Model', key: 'prohibitedModel' },
    { label: 'Prohibited Work Type', key: 'prohibitedWorkType' },
    { label: 'Shop Desirability', key: 'shopDesirability' },
    { label: 'Cost per Loco', key: 'costPerLoco' },
    { label: 'Cost per Slot', key: 'costPerSlot' },
  ];

  const [dataErrors, setDataErrors] = useState({});

  useEffect(() => {
    const fakeData: IShopPlan[] = [
      {
        shopCode: 'TRN',
        type: 'Internal',
        maxSlot: 6,
        prohibitedModel: '',
        prohibitedWorkType: 'PTC',
        shopDesirability: '',
        costPerLoco: '$4,649',
        costPerSlot: '$34,882'
      }
    ];
    setDataSource(fakeData);
  }, []);

  const handleRowClick = (rowData: IShopPlan) => {
    const hasRowError = Object.values(dataErrors).some((hasError) => hasError);
    if (hasRowError) {
      return;
    }
    const hasEditing = Object.values(dataSource).some((dataItem) => dataItem.editable);
    if (hasEditing) {
      return;
    }
    const rowIndex = dataSource.findIndex((dataItem) => dataItem.shopCode === rowData.shopCode);
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
    console.log(newDataSource, index)
    setDataSource(newDataSource);
  };

  return (
    <Card>
      <CardHeader
        title={'Shop Plan'}
        rightAction={
          <CSVLink filename={'shop-plan.csv'} data={dataSource} headers={headersCSV}>
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
