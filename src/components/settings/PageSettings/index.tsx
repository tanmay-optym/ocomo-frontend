import Grid from '@material-ui/core/Grid';
import MenuLeft from '../MenuLeft';

type PageSettingsProps = { component: JSX.Element };
const PageSettings = ({ component }: PageSettingsProps): React.FC => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} sm={3}>
        <MenuLeft />
      </Grid>
      <Grid item xs={6} sm={9}>
        {component}
      </Grid>
    </Grid>
  );
};

export default PageSettings;
