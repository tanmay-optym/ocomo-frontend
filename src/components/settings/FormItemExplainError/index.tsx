import React from 'react';
import styles from './FormItemExplainError.module.scss';

type ErrorType = { message: string };

type FormItemExplainErrorProps = {
  errors: { [key: string]: ErrorType };
  fieldName: string;
};

export default function FormItemExplainError({
  errors,
  fieldName
}: FormItemExplainErrorProps): JSX.Element {
  return (
    <div className={styles['form-item-explain-error']}>
      {errors[fieldName] && errors[fieldName].message}
    </div>
  );
}
