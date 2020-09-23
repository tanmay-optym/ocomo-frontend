import React from 'react';
import { Button } from '@material-ui/core';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import Card from '../Card';
import CardBody from '../CardBody';
import CardHeader from '../CardHeader';
// import TableTravelTimeLookup from './TableTravelTimeLookup';
import FormTravelTimeLookup from './FormTravelTimeLookup';

const TravelTimeLookup = (): React.FC => {
  return (
    <Card>
      <CardHeader
        title={'Travel Time Lookup'}
        rightAction={
          <Button>
            <GetAppOutlinedIcon />
          </Button>
        }
      />
      <CardBody>
        <FormTravelTimeLookup />
        {/* <TableTravelTimeLookup /> */}
      </CardBody>
    </Card>
  );
};

export default TravelTimeLookup;
