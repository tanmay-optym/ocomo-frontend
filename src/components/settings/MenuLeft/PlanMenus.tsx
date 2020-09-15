import React, { Fragment } from 'react';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import MenuGroupTitle from '../MenuGroupTitle';

export default ({ menus }) => {
    return (
        <Fragment>
            {menus.map((menuGroup) => {
                return (
                    <Fragment key={menuGroup.title}>
                        <AccordionDetails>
                            <div style={{ padding: '0 25px', width: '100%' }}>
                                <MenuGroupTitle title={menuGroup.title} />
                                <MenuList>
                                    {menuGroup.children.map((menu) => {
                                        return <MenuItem key={menu.title}>{menu.title}</MenuItem>;
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
