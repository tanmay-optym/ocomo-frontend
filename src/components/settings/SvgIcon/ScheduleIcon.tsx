import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import React from 'react';

function ScheduleIcon(props: SvgIconProps): React.FC {
  return (
    <SvgIcon {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.992 0C3.576 0 0 3.584 0 8C0 12.416 3.576 16 7.992 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 7.992 0ZM8.00059 14.401C4.46459 14.401 1.60059 11.537 1.60059 8.00096C1.60059 4.46496 4.46459 1.60096 8.00059 1.60096C11.5366 1.60096 14.4006 4.46496 14.4006 8.00096C14.4006 11.537 11.5366 14.401 8.00059 14.401ZM7.19971 3.9996H8.39971V8.1996L11.9997 10.3356L11.3997 11.3196L7.19971 8.7996V3.9996Z"
        fill="#9BA5AF"
      />
    </SvgIcon>
  );
}

export default ScheduleIcon;
