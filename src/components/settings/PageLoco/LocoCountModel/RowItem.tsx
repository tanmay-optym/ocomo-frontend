import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';

import { ILocoCountModel } from './index';

type RowItemProps = {
    initialValues: ILocoCountModel;
    maxValue: number
  };

export default function Item({
  initialValues,
  maxValue
}: RowItemProps): JSX.Element {
  const theme = useTheme();
  const width = (initialValues.value / maxValue) * 100;
  return (
    <div style={{ padding: theme.spacing(1) }}>
      <Grid container>
        <Grid item md={4} style={{ textAlign: 'right', paddingRight: theme.spacing(2) }}>{initialValues.name}</Grid>
        <Grid item md={8} style={{ paddingLeft: theme.spacing(2) }}>
          <div style={{ display: 'flex', alignItems: 'center', }}>
            <div style={{ backgroundColor: '#8FB2F4', width: `${width}%`, height: '10px', marginRight: theme.spacing(1) }} />
            <span>{initialValues.value}</span>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
