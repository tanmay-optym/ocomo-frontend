import React from 'react';
import { Button } from '@material-ui/core';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import Card from '../Card';
import CardBody from '../CardBody';
import CardHeader from '../CardHeader';
import TableResourcePlan from './TableResourcePlan';
import InputSetting from '../InputSetting';

const ResourcePlan = (): React.FC => {
  return (
    <Card>
      <CardHeader
        title={'Resource Plan'}
        rightAction={
          <Button>
            <GetAppOutlinedIcon />
          </Button>
        }
      />
      <CardBody>
        <TableResourcePlan />
      </CardBody>
    </Card>
  );
};

export default ResourcePlan;
