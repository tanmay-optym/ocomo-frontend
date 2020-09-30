import React from 'react';
import ScheduleIcon from '../SvgIcon/ScheduleIcon';
import styles from './InputHours.module.scss';

export default function InputHours(props): React.FC {
  return (
    <div className={styles['comp-input-hours']}>
      <input type="number" {...props} ref={props.refInput}></input>
      <span className={styles['input-suffix']}>
        <span className={styles['input-suffix-text']}>hrs</span>
        <span className={styles['input-suffix-icon']}>
          <ScheduleIcon />
        </span>
      </span>
    </div>
  );
}
