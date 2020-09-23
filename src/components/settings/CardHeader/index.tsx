import React from 'react';
import CardTitle from '../CardTitle';
import styles from './CardHeader.module.scss';

type CardHeaderProps = { title: string; leftAction: JSX.Element; rightAction: JSX.Element };

export default function CardHeader({ title, leftAction, rightAction }: CardHeaderProps): React.FC {
  return (
    <div className={styles['comp-card-header']}>
      {leftAction}
      <CardTitle title={title}></CardTitle>
      <div className={styles['action-right']}>{rightAction}</div>
    </div>
  );
}
