import React from 'react';
import CardTitle from '../CardTitle';
import TableEditResourcePlan from './TableEditResourcePlan';

const ResourcePlan = (): React.FC => {
  return (
    <div>
      <CardTitle title={'Resource Plan'} />
      <TableEditResourcePlan />
    </div>
  );
};

export default ResourcePlan;
