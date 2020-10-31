import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import LockOutlined from '@material-ui/icons/LockOutlined';
import styles from './ScheduleTag.module.scss';
import Dropdown from '../DropDown';
import HoverItem from './HoverItem';

type ScheduleTagProps = {
  title: string,
  isLock: boolean,
  width: string,
  style?: React.CSSProperties,
  progress?: number | string
}

type AnchorElType = Element | null;

const ScheduleTag = ({ title, isLock, width, style, progress }: ScheduleTagProps): JSX.Element => {
  const colors = {
    danger: '#FA5C64',
    success: '#11C97B',
    info: '#5BCEF2',
    warning: '#FCB64E',
    secondary: '#C7C3C3'
  };

  const [anchorEl, setAnchorEl] = useState<AnchorElType>(null);
  const [anchorHover, setAnchorHover] = useState<AnchorElType>(null);

  const handleClick = (e: {
    currentTarget: React.SetStateAction<AnchorElType>;
    preventDefault: () => void;
    stopPropagation: () => void; }) => {
    e.preventDefault();
    e.stopPropagation();
    if (anchorEl) {
      setAnchorEl(null);
    } else { setAnchorEl(e.currentTarget); }
  };

  const onHover = (e: {
    currentTarget: React.SetStateAction<AnchorElType>;
    preventDefault: () => void;
  }) => {
    e.preventDefault();
    setAnchorHover(e.currentTarget);
  };

  const onHoverClose = () => {
    setAnchorHover(null);
  };

  const handleClose = (e : {preventDefault: () => void}) => {
    e.preventDefault();
    setAnchorEl(null);
  };

  const getStyles = () => {
    let colStyle = { width, borderColor: colors.danger, zIndex: 99999 };
    if (style) {
      colStyle = { ...colStyle, ...styles };
    }
    return colStyle;
  };

  const listDropDown = [
    { name: 'Unlock' },
    { name: 'Add Loco' },
    { name: 'Delete' }
  ];

  const displayProgress = () => {
    if (!progress) return null;
    if (typeof progress === 'string') {
      return (
        <div
          style={{
            borderRadius: '50%',
            backgroundColor: colors.success,
            fontWeight: 'bold',
            fontSize: '12px',
            textAlign: 'center',
            lineHeight: '16px',
            color: 'white',
            width: '16px',
            height: '16px',
          }}>
          P
        </div>
      );
    }

    return (
      <div style={{ fontSize: '12px' }}>
        {progress}
        %
      </div>
    );
  };

  return (
    <>
      <Card
        style={getStyles()}
        className={styles.card}
        onContextMenu={handleClick}
        onMouseEnter={onHover}
        onMouseLeave={onHoverClose}
        >
        <div className={styles.header}>

          <div className={styles.title}>
            <span>{title}</span>
            {isLock ? <LockOutlined style={{ height: '14px' }} /> : null}
          </div>
          {displayProgress()}
        </div>
        <div className={styles.subTitle}>
          <span>aa</span>
          <span style={{ textAlign: 'right' }}>aa</span>
        </div>
      </Card>
      <Dropdown
        anchorEl={anchorEl}
        onClose={handleClose}
        styles={{ marginTop: 5 }}
        width="158px"
        listItems={listDropDown}
        />
      <HoverItem
        anchorEl={anchorHover}
        styles={{ marginTop: 10 }}

       />
    </>
  );
};

export default ScheduleTag;
