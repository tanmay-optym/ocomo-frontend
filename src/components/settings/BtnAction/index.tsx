import React from 'react';
import styles from './BtnAction.module.scss';
import Spin from '../Spin/Circular';

type BtnActionProps = {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
  style?: React.CSSProperties;
  loading?: boolean;
};

export default function BtnAction({
  onClick,
  children,
  type,
  style,
  loading,
  ...props
}: BtnActionProps): JSX.Element {
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!onClick) {
      return;
    }
    onClick(e);
  };
  return (
    <button
      {...props}
      type={type}
      disabled={loading}
      onClick={handleClick}
      style={style}
      className={styles['comp-btn-action']}>
      <Spin spinning={loading} style={{ width: 14, height: 14 }}>
        {children}
      </Spin>
    </button>
  );
}
