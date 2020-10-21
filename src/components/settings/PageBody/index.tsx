import React from 'react';

type PageBodyProps = { children: React.ReactNode };

export default function PageBody(props: PageBodyProps): JSX.Element {
  return (
    <div
      style={{
        padding: 18,
        maxHeight: 'calc(100vh - 60px)',
        overflow: 'scroll'
      }}>
      {props.children}
    </div>
  );
}
