import React, { ReactNode, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import MenuLeft from '../MenuLeft';
import ResourcePlan from './ResourcePlan';
import StandardWorkHours from './StandardWorkHours';
import TravelTimeLookup from './TravelTimeLookup';
import AdditionalParameters from './AdditionalParameters';
import AlertThresholds from './AlertThresholds';
import KPIColorThreshold from './KPIColorThreshold';
import FilterConfiguration from './FilterConfiguration';

type IConfigMenuItem = {
  code: string;
  node: ReactNode;
};
const CONFIG_MENU: IConfigMenuItem[] = [
  { code: '/resource-plan', node: <ResourcePlan /> },
  { code: '/standard-work-hours', node: <StandardWorkHours /> },
  { code: '/travel-time-lookup', node: <TravelTimeLookup /> },
  { code: '/additional-parameters', node: <AdditionalParameters /> },
  { code: '/alert-thresholds', node: <AlertThresholds /> },
  { code: '/filter-configuration', node: <FilterConfiguration /> },
  { code: '/kpi-color-threshold', node: <KPIColorThreshold /> }
];

const PageSettings = (): JSX.Element => {
  const [activeMenu, setActiveMenu] = useState('/resource-plan');
  const handleClickMenu = (url: string) => {
    setActiveMenu(url);
  };
  const page = CONFIG_MENU.find((item) => item.code === activeMenu);
  return (
    <Grid container style={{margin: 0, padding: 8}}  spacing={2}>
      <Grid item xs={6} sm={2}>
        <MenuLeft activeMenu={activeMenu} onClickMenu={handleClickMenu} />
      </Grid>
      <Grid item xs={6} sm={10}>
        {page ? page.node : null}
      </Grid>
    </Grid>
  );
};

export default PageSettings;
