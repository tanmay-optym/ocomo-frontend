import React, { useState } from 'react';
import styles from './BtnAction.module.scss';

type BtnActionProps = {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
  style?: React.CSSProperties;
};

export default function BtnAction({
  onClick,
  children,
  type,
  style,
  ...props
}: BtnActionProps): JSX.Element {
  const [loadding, setLoadding] = useState(false);
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!onClick) {
      return;
    }
    setLoadding(true);
    await onClick(e);
    setLoadding(false);
  };
  return (
    <button
      {...props}
      type={type}
      disabled={loadding}
      onClick={handleClick}
      style={style}
      className={styles['comp-btn-action']}>
      {children}
    </button>
  );
}
