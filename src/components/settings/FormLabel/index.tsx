import React from 'react';
import styles from './FormLabel.module.scss';

export default function FormLabel({ children, ...props }): React.FC {
  return (
    <span className={styles['comp-form-label']} {...props}>
      {children}
    </span>
  );
}
