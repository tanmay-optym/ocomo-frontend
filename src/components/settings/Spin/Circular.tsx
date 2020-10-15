import React, { Fragment } from 'react';
import { CircularProgress } from '@material-ui/core';

type SpinProps = {
  spinning: boolean | undefined | null;
  children: React.ReactNode;
  style: object;
};

export default ({ spinning, children, style }: SpinProps): JSX.Element => {
  if (spinning) {
    return <CircularProgress style={style} />;
  }
  return <>{children}</>;
};
