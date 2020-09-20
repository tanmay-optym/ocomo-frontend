import React from 'react';
import CardTitle from '../CardTitle';

type CardHeaderProps = { title: string; leftAction: JSX.Element };

export default function CardHeader({ title, leftAction }: CardHeaderProps): React.FC {
  return (
    <div
      style={{
        height: '40px',
        lineHeight: '40px',
        borderBottom: '1px solid #D8D8D8',
        padding: '0 15px',
        alignItems: 'center',
        display: 'flex'
      }}>
      {leftAction}
      <CardTitle title={title}></CardTitle>
    </div>
  );
}
