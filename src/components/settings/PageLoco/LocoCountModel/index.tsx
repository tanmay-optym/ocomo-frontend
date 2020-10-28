import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';

import { CSVLink } from 'react-csv';
import Card from '../../Card';
import CardHeader from '../../CardHeader';
import RowItem from './RowItem';
import Spin from '../../Spin';
import PageBody from '../../PageBody';

export type ILocoCountModel = {
    name: string;
    value: number;
  };

const LocoCountModel = (): JSX.Element => {
  const [dataSource, setDataSource] = useState<ILocoCountModel[]>([]);
  const headersCSV = [
    { label: 'Name', key: 'name' },
    { label: 'Value', key: 'value' },
  ];

  useEffect(() => {
    setDataSource([
      { name: 'TEST_1', value: 175 },
      { name: 'TEST_2', value: 54 },
      { name: 'TEST_3', value: 51 },
      { name: 'TEST_4', value: 26 },
      { name: 'TEST_5', value: 4 }
    ]);
  }, []);

  const maxValue = Math.max.apply(null, dataSource.map((o) => { return o.value; }));

  return (
    <Card>
      <CardHeader
        title="Loco count by model"
        rightAction={
          <CSVLink filename="additional-parameters.csv" data={dataSource} headers={headersCSV}>
            <Button>
              <GetAppOutlinedIcon />
            </Button>
          </CSVLink>
          }
        />
      <PageBody>
        <Spin spinning={false}>
          <div>
            {dataSource.map((dataItem, index) => {
              return (
                <RowItem
                  initialValues={{ ...dataItem }}
                  maxValue={maxValue}
                  key={index.toString()}
                />
              );
            })}
          </div>
        </Spin>
      </PageBody>
    </Card>
  );
};

export default LocoCountModel;
