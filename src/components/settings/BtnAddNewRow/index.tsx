import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import styles from './BtnAddNewRow.module.scss';
export default function BtnAddNewRow(props): React.FC {
  return (
    <button {...props} className={styles['comp-btn-add-new-row']}>
      <AddIcon />
      <span>Add New Row</span>
    </button>
  );
}
