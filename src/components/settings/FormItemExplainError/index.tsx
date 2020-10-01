import React from 'react';
import styles from './FormItemExplainError.module.scss';

export default function FormItemExplainError({ errors, fieldName }): React.FC {
  return (
    <div className={styles['form-item-explain-error']}>
      {errors[fieldName] && errors[fieldName].message}
    </div>
  );
}
