import React from 'react';

type CardProps = { children: React.ReactNode; borderRadius: string };

export default function Card({ children, borderRadius = '4px' }: CardProps): JSX.Element {
  return (
    <div
      style={{
        background: '#FFFFFF',
        boxShadow: '0px 0px 8px rgba(0,0,0,0.15)',
        borderRadius: borderRadius
      }}>
      {children}
    </div>
  );
}
