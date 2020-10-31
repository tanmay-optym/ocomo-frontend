import React from 'react';
import classNames from 'classnames';
import CardTitle from '../CardTitle';
import styles from './CardHeader.module.scss';

type CardHeaderProps = {
  title: string;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
  className?: string
};

export default function CardHeader({
  title,
  leftAction,
  rightAction,
  className
}: CardHeaderProps): JSX.Element {
  const classes = classNames(
    styles['comp-card-header'],
    className
  );
  return (
    <div className={classes}>
      {leftAction}
      <CardTitle title={title} />
      <div className={styles['action-right']}>{rightAction}</div>
    </div>
  );
}
