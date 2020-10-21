import React, { ReactNode, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import MenuLeft from '../MenuLeft';
import ResourcePlan from './ResourcePlan';
import StandardWorkHours from './StandardWorkHours';
import TravelTimeLookup from './TravelTimeLookup';
import AdditionalParameters from './AdditionalParameters';
import AlertThresholds from './AlertThresholds';
import KPIColorThreshold from './KPIColorThreshold';
import FilterConfiguration from './FilterConfiguration';
import ShopPlan from './ShopPlan';
import WorkType from './WorkType';

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
  { code: '/kpi-color-threshold', node: <KPIColorThreshold /> },
  { code: '/shop-plan', node: <ShopPlan /> },
  { code: '/work-type', node: <WorkType /> },
];

const PageSettings = (): JSX.Element => {
  const [activeMenu, setActiveMenu] = useState('/resource-plan');
  const theme = useTheme();
  const handleClickMenu = (url: string) => {
    setActiveMenu(url);
  };
  const page = CONFIG_MENU.find((item) => item.code === activeMenu);
  return (
    <Grid container style={{ backgroundColor: '#EDEDED', padding: theme.spacing(1) }}>
      <Grid item xs={6} sm={2}>
        <MenuLeft activeMenu={activeMenu} onClickMenu={handleClickMenu} />
      </Grid>
      <Grid item xs={6} sm={10} style={{ paddingLeft: theme.spacing(1) }}>
        {page ? page.node : null}
      </Grid>
    </Grid>
  );
};

export default PageSettings;
