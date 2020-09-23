import React from 'react';
import FormLabel from '../FormLabel';
import styles from './FormItem.module.scss';

export default function FormItem({ label = '', ...props }): React.FC {
  return (
    <div className={styles['comp-form-item']}>
      <div className={styles['comp-form-item-label']}>
        <FormLabel>{label}</FormLabel>
      </div>
      <div className={styles['comp-form-item-control']}>{props.children}</div>
    </div>
  );
}
