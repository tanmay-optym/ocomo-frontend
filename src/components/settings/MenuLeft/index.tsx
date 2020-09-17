import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from '@material-ui/core/Card';
import CardTitle from '../CardTitle';
import menuLeftData from '../../../../fakeData/menuLeftData';
import PlanMenus from './PlanMenus';

const MenuLeft = (): React.FC => {
  return (
    <Card>
      {Object.values(menuLeftData).map((plan) => {
        return (
          <Accordion key={plan.title} defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header">
              <CardTitle title={plan.title} />
            </AccordionSummary>
            <PlanMenus menus={plan.menus} />
          </Accordion>
        );
      })}
    </Card>
  );
};

export default MenuLeft;
