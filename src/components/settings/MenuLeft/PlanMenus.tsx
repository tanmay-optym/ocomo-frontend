import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import MenuGroupTitle from './MenuGroupTitle';

type PlanMenusProps = { menus: object[] };

const PlanMenus = ({ menus }: PlanMenusProps): React.FC => {
  const router = useRouter();
  const handleClickMenu = (menu) => {
    router.push(menu.url);
  };
  console.log(router);
  return (
    <Fragment>
      {menus.map((menuGroup) => {
        return (
          <Fragment key={menuGroup.title}>
            <AccordionDetails>
              <div style={{ width: '100%' }}>
                <MenuGroupTitle title={menuGroup.title} />
                <MenuList>
                  {menuGroup.children.map((menu) => {
                    return (
                      <MenuItem onClick={() => handleClickMenu(menu)} key={menu.title}>
                        {menu.title}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </div>
            </AccordionDetails>
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default PlanMenus;
