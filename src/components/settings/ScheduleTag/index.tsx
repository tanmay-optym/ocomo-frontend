import React from 'react';
import Card from '@material-ui/core/Card';
import LockOutlined from '@material-ui/icons/LockOutlined';
import styles from './ScheduleTag.module.scss';

type ScheduleTagProps = {
  title: string,
  isLock: boolean,
  width: string,
  style?: React.CSSProperties,
  progress?: number | string
}

const ScheduleTag = ({ title, isLock, width, style, progress }: ScheduleTagProps): JSX.Element => {
  const colors = {
    danger: '#FA5C64',
    success: '#11C97B',
    info: '#5BCEF2',
    warning: '#FCB64E',
    secondary: '#C7C3C3'
  };

  const getStyles = () => {
    let colStyle = { width, borderColor: colors.danger };
    if (style) {
      colStyle = { ...colStyle, ...styles };
    }
    return colStyle;
  };

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
    console.log(123);
    return (
      <div style={{ fontSize: '12px' }}>
        {progress}
        %
      </div>
    );
  };

  return (
    <Card style={getStyles()} className={styles.card}>
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
  );
};

export default ScheduleTag;
