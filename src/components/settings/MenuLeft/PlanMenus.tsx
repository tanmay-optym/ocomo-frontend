import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import MenuGroupTitle from './MenuGroupTitle';
import styles from './PlanMenus.module.scss';
import { IMenuItem } from './index';

type PlanMenusProps = {
  menus: IMenuItem[];
  onClickMenu: (url: string) => void;
  activeMenu: string;
};

const PlanMenus = ({ menus, onClickMenu, activeMenu }: PlanMenusProps): JSX.Element => {
  const router = useRouter();
  const handleClickMenu = (menu: IMenuItem) => {
    if (onClickMenu) {
      if (menu.url) {
        onClickMenu(menu.url);
      }
    }
  };
  return (
    <Fragment>
      {menus.map((menuGroup) => {
        return (
          <Fragment key={menuGroup.title}>
            <div className={styles['comp-plan-menu']}>
              <MenuGroupTitle title={menuGroup.title} />
              <MenuList className={styles['comp-plan-menu-list']}>
                {(menuGroup.children || []).map((menu) => {
                  return (
                    <MenuItem
                      className={`${styles['comp-plan-menu-item']} ${
                        activeMenu === menu.url ? styles['comp-plan-menu-item-active'] : ''
                      }`}
                      onClick={() => handleClickMenu(menu)}
                      key={menu.title}>
                      {menu.title}
                    </MenuItem>
                  );
                })}
              </MenuList>
            </div>
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default PlanMenus;
