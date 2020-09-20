import React from 'react';
import Card from '@material-ui/core/Card';
import PlanMenus from './PlanMenus';
import CardHeader from '../CardHeader';
import CardBody from '../CardBody';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import menuLeftData from '../../../../fakeData/menuLeftData';

const MenuLeft = (): React.FC => {
  return (
    <Card>
      {Object.values(menuLeftData).map((plan) => {
        return (
          <Card key={plan.title}>
            <CardHeader
              leftAction={<ExpandMoreIcon color={'primary'} />}
              title={plan.title}></CardHeader>
            <CardBody>
              <PlanMenus menus={plan.menus} />
            </CardBody>
          </Card>
        );
      })}
    </Card>
  );
};

export default MenuLeft;
