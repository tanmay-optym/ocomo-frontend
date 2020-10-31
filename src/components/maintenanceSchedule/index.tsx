import React from 'react';
import ScheduleTag from './ScheduleTag';

export default function MaintenanceSchedule(): JSX.Element {
  return <ScheduleTag width="200px" title="test" isLock progress={10} />;
}
