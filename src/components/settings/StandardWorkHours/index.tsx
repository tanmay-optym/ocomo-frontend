import React from 'react';
import Card from '../Card';
import CardBody from '../CardBody';
import CardHeader from '../CardHeader';
import TableStandardWorkHours from './TableStandardWorkHours';
const ResourcePlan = (): React.FC => {
  return (
    <Card>
      <CardHeader title={'Travel Time Lookup'} />
      <CardBody>
        <TableStandardWorkHours />
      </CardBody>
    </Card>
  );
};

export default ResourcePlan;
