import React from 'react';
import ScheduleIcon from '../SvgIcon/ScheduleIcon';
import styles from './InputHours.module.scss';

type InputHoursProps = {
  refinput:
    | string
    | ((instance: HTMLInputElement | null) => void)
    | React.RefObject<HTMLInputElement>
    | null
    | undefined;
  type?: string;
  name: string;
  style?: React.CSSProperties;
};

export default function InputHours(props: InputHoursProps): JSX.Element {
  return (
    <div className={styles['comp-input-hours']}>
      <input type="number" {...props} ref={props.refinput}></input>
      <span className={styles['input-suffix']}>
        <span className={styles['input-suffix-text']}>hrs</span>
        <span className={styles['input-suffix-icon']}>
          <ScheduleIcon />
        </span>
      </span>
    </div>
  );
}
