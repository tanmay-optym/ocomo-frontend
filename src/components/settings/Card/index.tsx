import React from 'react';

type CardProps = { children: JSX.Element[] | JSX.Element };

export default function Card(props: CardProps): React.FC {
  return (
    <div
      style={{
        background: '#FFFFFF',
        boxShadow: '0px 0px 8px rgba(0,0,0,0.15)',
        borderRadius: '4px'
      }}>
      {props.children}
    </div>
  );
}
