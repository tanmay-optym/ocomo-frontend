import React from 'react';
import { Button } from '@material-ui/core';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import Card from '../Card';
import CardBody from '../CardBody';
import CardHeader from '../CardHeader';
import FormAdditionalParameters from './FormAdditionalParameters';

const AdditionalParameters = (): React.FC => {
  return (
    <Card>
      <CardHeader
        title={'Additional Parameters'}
        rightAction={
          <Button>
            <GetAppOutlinedIcon />
          </Button>
        }
      />
      <CardBody>
        <FormAdditionalParameters />
      </CardBody>
    </Card>
  );
};

export default AdditionalParameters;
