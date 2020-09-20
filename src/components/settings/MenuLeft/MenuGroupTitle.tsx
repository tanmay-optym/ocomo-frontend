import React from 'react';

type MenuGroupTitleProps = { title: string };

export default function MenuGroupTitle({ title }: MenuGroupTitleProps): React.FC {
  return <span style={{ color: '#2F3E4D', fontSize: 14, fontWeight: 'bold' }}>{title}</span>;
}