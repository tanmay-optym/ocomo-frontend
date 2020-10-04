import React from 'react';
import styles from './FormLabel.module.scss';

type FormLabelProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export default function FormLabel({ children, style = {}, ...props }: FormLabelProps): JSX.Element {
  return (
    <span className={styles['comp-form-label']} style={style} {...props}>
      {children}
    </span>
  );
}
