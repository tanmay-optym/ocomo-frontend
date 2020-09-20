import React from 'react';
import Card from '../Card';
import CardBody from '../CardBody';
import CardHeader from '../CardHeader';
import TableEditResourcePlan from './TableEditResourcePlan';

const ResourcePlan = (): React.FC => {
  return (
    <Card>
      <CardHeader title={'Resource Plan'} />
      <CardBody>
        <TableEditResourcePlan />
      </CardBody>
    </Card>
  );
};

export default ResourcePlan;
