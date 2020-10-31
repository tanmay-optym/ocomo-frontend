import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import style from './DropDown.module.scss';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: MenuProps): JSX.Element => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

type IDropdownItem = {
  name: string,
  onClick?: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  icon?: React.ReactNode;
}

type DropdownProps = {
  listItems: IDropdownItem[],
  anchorEl: null | Element | ((element: Element) => Element),
  onClose: (event: any) => void,
  styles?: React.CSSProperties,
  width?: string
}

export default function Dropdown({
  listItems,
  anchorEl,
  onClose,
  styles, width } : DropdownProps): JSX.Element {
  return (

    <StyledMenu
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={onClose}
      style={{ ...styles, zIndex: -1, height: '100%' }}
      onContextMenu={onClose}
      disableAutoFocusItem
      >
      {
          listItems.map((item, index) => {
            return (
              <StyledMenuItem
                key={index.toString()}
                onClick={item.onClick}
                className={style.dropdownMenu}
                style={{ width }}>
                {
                  item.icon ? (
                    <ListItemIcon>
                      {item.icon}
                    </ListItemIcon>
                  ) : null
                }
                <ListItemText primary={item.name} className={style.dropdownItem} />
              </StyledMenuItem>
            );
          })
        }
    </StyledMenu>

  );
}
