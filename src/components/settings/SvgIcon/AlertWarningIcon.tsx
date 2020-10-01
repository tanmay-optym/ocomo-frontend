import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import React from 'react';

function AlertWarningIcon(props: SvgIconProps): React.FC {
  return (
    <SvgIcon {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.5263 16.5L9.26316 0.5L0 16.5H18.5263ZM8.42105 13.9737V12.2895H10.1053V13.9737H8.42105ZM8.42105 10.6053H10.1053V7.23684H8.42105V10.6053Z"
        fill="#F3B622"
      />
    </SvgIcon>
  );
}

export default AlertWarningIcon;
