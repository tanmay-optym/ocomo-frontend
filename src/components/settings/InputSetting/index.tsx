import React from 'react';
import styles from './InputSetting.module.scss';

type InputSettingProps = {
  refInput:
    | string
    | ((instance: HTMLInputElement | null) => void)
    | React.RefObject<HTMLInputElement>
    | null
    | undefined;
  type?: string;
  name: string;
  style?: React.CSSProperties;
  placeholder?: string;
};

export default function InputSetting({
  name,
  type,
  refInput,
  style,
  ...props
}: InputSettingProps): JSX.Element {
  return (
    <input
      className={styles['comp-input-setting']}
      type={type}
      ref={refInput}
      name={name}
      style={style}
      {...props}></input>
  );
}
