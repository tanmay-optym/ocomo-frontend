import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import React from 'react';

function TrendingFlatIcon(props: SvgIconProps): React.FC {
  return (
    <SvgIcon style={{ width: 60 }} {...props}>
      <path opacity="0.5" d="M41.1429 6L35.0075 0V4.5H0V7.5H35.0075V12L41.1429 6Z" fill="#778899" />
    </SvgIcon>
  );
}

export default TrendingFlatIcon;
