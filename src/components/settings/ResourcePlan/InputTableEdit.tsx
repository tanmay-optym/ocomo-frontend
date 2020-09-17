import React from 'react';

export default function InputTableEdit(props): React.FC {
  return (
    <input
      style={{
        border: '1px solid #D8D8D8',
        borderRadius: '2px',
        height: '25px',
        padding: '2px 10px'
      }}
      {...props}></input>
  );
}
