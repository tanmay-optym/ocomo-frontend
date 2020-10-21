import React from 'react';
import styles from './FormItemExplainError.module.scss';

type FormItemExplainErrorProps = {
  errors: any;
  fieldName: string;
};

export default function FormItemExplainError({
  errors,
  fieldName,
}: FormItemExplainErrorProps): JSX.Element {
  return (
    <>
      {errors[fieldName] && (
        <div className={styles['form-item-explain-error']}>{errors[fieldName].message}</div>
      )}
    </>
  );
}
