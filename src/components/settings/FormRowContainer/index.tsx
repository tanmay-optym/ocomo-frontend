import React from 'react';
import styles from './FormRowContainer.module.scss';

export default function RowFormGroup(props): React.FC {
  return <div className={styles['comp-form-row-container']}>{props.children}</div>;
}
