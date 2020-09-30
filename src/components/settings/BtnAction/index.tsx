import React, { useState } from 'react';
import styles from './BtnAction.module.scss';

export default function BtnAction(props): React.FC {
  const [loadding, setLoadding] = useState(false);
  const handleClick = async (e) => {
    if (!props.onClick) {
      return;
    }
    setLoadding(true);
    await props.onClick(e);
    setLoadding(false);
  };
  return (
    <button
      {...props}
      disabled={loadding}
      onClick={handleClick}
      className={styles['comp-btn-action']}>
      {props.children}
    </button>
  );
}
