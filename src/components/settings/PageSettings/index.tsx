import Grid from '@material-ui/core/Grid';
import { useState } from 'react';
import MenuLeft from '../MenuLeft';
import ResourcePlan from '../ResourcePlan';
import StandardWorkHours from '../StandardWorkHours';
import TravelTimeLookup from '../TravelTimeLookup';
import AdditionalParameters from '../AdditionalParameters';
// type PageSettingsProps = {};

const CONFIG_MENU = {
  '/resource-plan': <ResourcePlan />,
  '/standard-work-hours': <StandardWorkHours />,
  '/travel-time-lookup': <TravelTimeLookup />,
  '/additional-parameters': <AdditionalParameters />
};

const PageSettings = (): React.FC => {
  const [activeMenu, setActiveMenu] = useState('/resource-plan');
  const handleClickMenu = (url) => {
    setActiveMenu(url);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} sm={2}>
        <MenuLeft activeMenu={activeMenu} onClickMenu={handleClickMenu} />
      </Grid>
      <Grid item xs={6} sm={10}>
        {CONFIG_MENU[activeMenu]}
      </Grid>
    </Grid>
  );
};

export default PageSettings;
