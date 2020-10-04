import React from 'react';
import Card from '@material-ui/core/Card';
import PlanMenus from './PlanMenus';
import menuLeftData from '../../../../fakeData/menuLeftData';
import Collapse from '../Collapse';

type MenuLeftProps = {
  onClickMenu: (e: React.MouseEvent<HTMLButtonElement>) => void;
  activeMenu: string;
};

const MenuLeft = ({ onClickMenu, activeMenu }: MenuLeftProps): JSX.Element => {
  return (
    <Card>
      {Object.values(menuLeftData).map((plan) => {
        return (
          <Collapse
            key={plan.title}
            title={plan.title}
            content={
              <PlanMenus activeMenu={activeMenu} menus={plan.menus} onClickMenu={onClickMenu} />
            }></Collapse>
        );
      })}
    </Card>
  );
};

export default MenuLeft;
