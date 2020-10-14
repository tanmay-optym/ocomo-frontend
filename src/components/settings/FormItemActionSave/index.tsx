import React, { useState, useEffect } from 'react';
import BtnAction from '../BtnAction';
import FormItem from '../FormItem';

type FormItemActionSaveProps = {
  initialValues: any;
  values: any;
  isDirty: boolean;
  loading: boolean | undefined;
};

export default function FormItemActionSave({
  initialValues,
  values,
  isDirty,
  loading,
}: FormItemActionSaveProps): JSX.Element {
  const [hiddenBtnSave, setHiddenBtnSave] = useState(false);
  useEffect(() => {
    if (!isDirty) {
      return;
    }
    const wasChange = Object.entries(values).some(
      ([key, v]) => (initialValues[key] || '').toString() !== v
    );
    setHiddenBtnSave(wasChange);
  }, [initialValues, values, isDirty]);
  return (
    <FormItem style={{ width: 50 }}>
      {(hiddenBtnSave || initialValues.isNew) && (
        <BtnAction type="submit" loading={loading}>
          {initialValues.isNew ? 'Add' : 'Save'}
        </BtnAction>
      )}
    </FormItem>
  );
}
