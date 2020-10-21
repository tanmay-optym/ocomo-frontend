import React, { Fragment } from 'react';
import { LinearProgress } from '@material-ui/core';
// import CircularProgress from '@material-ui/core/CircularProgress';

type SpinProps = {
  spinning: boolean | undefined | null;
  children: React.ReactNode;
};

export default ({ spinning, children }: SpinProps): JSX.Element => {
  if (spinning) {
    return <LinearProgress />;
  }
  return <Fragment>{children}</Fragment>;
};
