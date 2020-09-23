import React from 'react';
import styles from './InputSetting.module.scss';

export default function InputSetting(props): React.FC {
  return <input className={styles['comp-input-setting']} {...props}></input>;
}
