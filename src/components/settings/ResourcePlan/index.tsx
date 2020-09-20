import React from 'react';
import Card from '../Card';
import CardBody from '../CardBody';
import CardHeader from '../CardHeader';
import TableResourcePlan from './TableResourcePlan';

const ResourcePlan = (): React.FC => {
  return (
    <Card>
      <CardHeader title={'Resource Plan'} />
      <CardBody>
        <TableResourcePlan />
      </CardBody>
    </Card>
  );
};

export default ResourcePlan;
