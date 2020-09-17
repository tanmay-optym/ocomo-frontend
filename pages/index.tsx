import { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import MenuLeft from '../src/components/settings/MenuLeft';
import ResourcePlan from '../src/components/settings/ResourcePlan';

const PageSettings = (): React.FC => {
  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={3}>
          <MenuLeft />
        </Grid>
        <Grid item xs={6} sm={9}>
          <ResourcePlan />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default PageSettings;
