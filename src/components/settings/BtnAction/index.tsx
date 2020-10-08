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
  const [loading, setLoading] = useState(false);
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!onClick) {
      return;
    }
    setLoading(true);
    await onClick(e);
    setLoading(false);
  };
  return (
    <button
      {...props}
      type={type}
      disabled={loading}
      onClick={handleClick}
      style={style}
      className={styles['comp-btn-action']}>
      {children}
    </button>
  );
}
