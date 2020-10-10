import React, { Fragment } from 'react';
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
  console.log(errors[fieldName] && errors[fieldName].message);
  return (
    <Fragment>
      {errors[fieldName] && (
        <div className={styles['form-item-explain-error']}>{errors[fieldName].message}</div>
      )}
    </Fragment>
  );
}
