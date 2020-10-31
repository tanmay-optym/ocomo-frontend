import React from 'react';
import { Button } from '@material-ui/core';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import { CSVLink } from 'react-csv';
import VerticalBarChart from './VerticalBarChart';
import Card from '../../settings/Card';
import CardHeader from '../../settings/CardHeader';
import Spin from '../../settings/Spin';
import PageBody from '../../settings/PageBody';

export type ILocoCount = {
  name: string;
  value: number;
};

type LocoCountProps = {
  title: string;
  dataSource: ILocoCount[];
  headersCSV: any;
  styles?: React.CSSProperties;
};

const LocoCount = ({
  title = '',
  dataSource = [],
  headersCSV,
  styles,
}: LocoCountProps): JSX.Element => {
  return (
    <div style={styles}>
      <Card>
        <CardHeader
          title={title}
          rightAction={
            <CSVLink filename={`${title}.csv`} data={dataSource} headers={headersCSV}>
              <Button>
                <GetAppOutlinedIcon />
              </Button>
            </CSVLink>
          }
        />
        <PageBody>
          <Spin spinning={false}>
            <div>
              <VerticalBarChart data={dataSource} />
            </div>
          </Spin>
        </PageBody>
      </Card>
    </div>
  );
};

export default LocoCount;
