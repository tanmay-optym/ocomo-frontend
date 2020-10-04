import React from 'react';
import styles from './FormRowContainer.module.scss';

type RowFormGroupProps = { children: React.ReactNode };

export default function RowFormGroup(props: RowFormGroupProps): JSX.Element {
  return <div className={styles['comp-form-row-container']}>{props.children}</div>;
}
