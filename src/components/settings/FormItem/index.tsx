import React from 'react';
import FormLabel from '../FormLabel';
import styles from './FormItem.module.scss';

type FormItemProps = {
  label?: string | React.ReactNode;
  margin?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

export default function FormItem({
  label,
  margin = 10,
  style,
  ...props
}: FormItemProps): JSX.Element {
  return (
    <div style={{ ...style, marginLeft: margin }} className={styles['comp-form-item']}>
      {label && (
        <div className={styles['comp-form-item-label']}>
          <FormLabel>{label}</FormLabel>
        </div>
      )}
      <div className={styles['comp-form-item-control']}>{props.children}</div>
    </div>
  );
}
