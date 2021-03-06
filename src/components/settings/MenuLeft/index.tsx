import React, { Fragment } from 'react';
import Card from '@material-ui/core/Card';
import { Divider } from '@material-ui/core';
import PlanMenus from './PlanMenus';
import menuLeftData from './menuLeftData';
import Collapse from '../Collapse';

type MenuLeftProps = {
  onClickMenu: (url: string) => void;
  activeMenu: string;
};

export type IMenuItem = { title: string; url?: string; children?: IMenuItem[] };

export type IPlanMenu = {
  title: string;
  menus: IMenuItem[];
};

const MenuLeft = ({ onClickMenu, activeMenu }: MenuLeftProps): JSX.Element => {
  return (
    <Card>
      {menuLeftData.map((plan: IPlanMenu, i) => {
        return (
          <Fragment key={plan.title}>
            {i !== 0 && <Divider />}
            <Collapse
              title={plan.title}
              content={
                <PlanMenus activeMenu={activeMenu} menus={plan.menus} onClickMenu={onClickMenu} />
              } />
          </Fragment>
        );
      })}
    </Card>
  );
};

export default MenuLeft;
