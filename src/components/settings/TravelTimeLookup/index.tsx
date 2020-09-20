import React from 'react';
import Card from '../Card';
import CardBody from '../CardBody';
import CardHeader from '../CardHeader';
import TableTravelTimeLookup from './TableTravelTimeLookup';
const ResourcePlan = (): React.FC => {
  return (
    <Card>
      <CardHeader title={'Standard Work Hours'} />
      <CardBody>
        <TableTravelTimeLookup />
      </CardBody>
    </Card>
  );
};

export default ResourcePlan;
