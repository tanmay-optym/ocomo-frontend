import React from 'react';
import { Button } from '@material-ui/core';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';

import { CSVLink } from 'react-csv';
import Card from '../../Card';
import CardHeader from '../../CardHeader';
import VerticalBarChart from './VerticalBarChart';
import Spin from '../../Spin';
import PageBody from '../../PageBody';

export type ILocoCount = {
  name: string,
  value: number
}

type LocoCountProps = {
  dataSource: ILocoCount[];
  headersCSV: any;
  styles?: React.CSSProperties
};

const LocoCount = ({ dataSource = [], headersCSV, styles }: LocoCountProps): JSX.Element => {
  return (
    <div style={styles}>
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
              <VerticalBarChart data={dataSource} />
            </div>
          </Spin>
        </PageBody>
      </Card>
    </div>
  );
};

export default LocoCount;
