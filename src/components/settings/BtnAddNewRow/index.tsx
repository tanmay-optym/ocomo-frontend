import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import styles from './BtnAddNewRow.module.scss';

type BtnAddNewRowProps = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function BtnAddNewRow({ onClick }: BtnAddNewRowProps): JSX.Element {
  return (
    <button onClick={onClick} className={styles['comp-btn-add-new-row']}>
      <AddIcon />
      <span>Add New Row</span>
    </button>
  );
}
