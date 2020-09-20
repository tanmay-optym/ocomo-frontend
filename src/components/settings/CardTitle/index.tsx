import { Typography } from '@material-ui/core';
import React from 'react';

type CardTitleProps = { title: string };

export default function CardTitle({ title }: CardTitleProps): React.FC {
  return <Typography color="primary">{title}</Typography>;
}
