import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import type { CellContext } from '@tanstack/react-table';

const EditableCell = <T,>({
  getValue,
  row,
  column,
  table,
  isEditing,
}: CellContext<T, any> & { isEditing?: boolean }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return isEditing ? (
    <TextField
      value={value as string}
      onChange={(e) => setValue(e.target.value)}
      variant="standard"
    />
  ) : (
    <span>{value}</span>
  );
};

export default EditableCell;
