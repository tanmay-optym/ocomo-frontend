import React, { Fragment } from 'react';
import { DeepMap, FieldError } from 'react-hook-form';
import styles from './FormItemExplainError.module.scss';

type ErrorType = { message: string };

type FormItemExplainErrorProps = {
  errors: any;
  fieldName: string;
};

export default function FormItemExplainError({
  errors,
  fieldName
}: FormItemExplainErrorProps): JSX.Element {
  return (
    <Fragment>
      {errors[fieldName] && (
        <div className={styles['form-item-explain-error']}>{errors[fieldName].message}</div>
      )}
    </Fragment>
  );
}
