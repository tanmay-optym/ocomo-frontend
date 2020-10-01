import React from 'react';
import styles from './InputTableEdit.module.scss';

export default function InputTableEdit(props): React.FC {
  return (
    <input className={styles['comp-input-table-edit']} ref={props.refInput} {...props}></input>
  );
}
