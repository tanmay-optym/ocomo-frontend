import React from 'react';

type CardBodyProps = { children: React.ReactNode };

export default function CardBody(props: CardBodyProps): JSX.Element {
  return (
    <div
      style={{
        padding: 18
      }}>
      {props.children}
    </div>
  );
}
