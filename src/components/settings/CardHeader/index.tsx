import React from 'react';
import CardTitle from '../CardTitle';
import styles from './CardHeader.module.scss';

type CardHeaderProps = {
  title: string;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
};

export default function CardHeader({
  title,
  leftAction,
  rightAction
}: CardHeaderProps): JSX.Element {
  return (
    <div className={styles['comp-card-header']}>
      {leftAction}
      <CardTitle title={title}></CardTitle>
      <div className={styles['action-right']}>{rightAction}</div>
    </div>
  );
}
