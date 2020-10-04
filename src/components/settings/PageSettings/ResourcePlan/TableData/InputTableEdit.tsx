import React from 'react';
import styles from './InputTableEdit.module.scss';

type InputTableEditProps = {
  refInput:
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
  refInput,
  style,
  ...props
}: InputTableEditProps): JSX.Element {
  return (
    <input
      className={styles['comp-input-table-edit']}
      type={type}
      ref={refInput}
      name={name}
      style={style}
      {...props}></input>
  );
}
