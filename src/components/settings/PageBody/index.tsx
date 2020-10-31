import React from 'react';

type PageBodyProps = { children: React.ReactNode, style?: React.CSSProperties };

export default function PageBody(props: PageBodyProps): JSX.Element {
  const { children, style } = props;
  return (
    <div
      style={{
        padding: 18,
        maxHeight: 'calc(100vh - 60px)',
        overflow: 'scroll',
        ...style || null
      }}>
      {children}
    </div>
  );
}
