import { Typography } from '@material-ui/core';
import React from 'react';
import styles from './CardTitle.module.scss';

type CardTitleProps = { title: string };

export default function CardTitle({ title }: CardTitleProps): JSX.Element {
  return (
    <Typography className={styles['comp-cart-title']} color="primary">
      {title}
    </Typography>
  );
}
