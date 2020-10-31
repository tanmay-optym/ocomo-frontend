import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import LocoCountModel from './LocoCountModel';
import LocoCountWorkScope from './LocoCountWorkScope';

const PageLoco = (): JSX.Element => {
  const theme = useTheme();
  return (
    <Grid container style={{ backgroundColor: '#EDEDED', padding: theme.spacing(1) }}>
      <Grid item xs={6} sm={9} />
      <Grid item xs={6} sm={3}>
        <LocoCountModel styles={{ marginBottom: 20 }} />
        <LocoCountWorkScope />
      </Grid>
    </Grid>
  );
};

export default PageLoco;
