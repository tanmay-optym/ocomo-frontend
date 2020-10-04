import React from 'react';

type CardProps = { children: React.ReactNode };

export default function Card(props: CardProps): JSX.Element {
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
