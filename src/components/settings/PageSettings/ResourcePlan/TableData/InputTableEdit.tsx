import React from 'react';
import styles from './InputTableEdit.module.scss';

type InputTableEditProps = {
  refinput:
    | string
    | ((instance: HTMLInputElement | null) => void)
    | React.RefObject<HTMLInputElement>
    | null
    | undefined;
  type?: string;
  name: string;
  style?: React.CSSProperties;
};

export default function InputTableEdit({
  name,
  type,
  refinput,
  style,
  ...props
}: InputTableEditProps): JSX.Element {
  return (
    <input
      className={styles['comp-input-table-edit']}
      type={type}
      ref={refinput}
      name={name}
      style={style}
      {...props}
    />
  );
}
