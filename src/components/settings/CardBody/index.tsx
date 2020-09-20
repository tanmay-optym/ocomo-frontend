import React from 'react';

type CardBodyProps = { children: JSX.Element[] | JSX.Element };

export default function CardBody(props: CardBodyProps): React.FC {
  return (
    <div
      style={
        {
          //padding: 18
        }
      }>
      {props.children}
    </div>
  );
}
