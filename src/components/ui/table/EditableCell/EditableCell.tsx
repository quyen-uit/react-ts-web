import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import type { CellContext } from '@tanstack/react-table';

interface EditableCellProps<T> {
  getValue: () => any;
  row: any;
  column: any;
  table: any;
}

const EditableCell = <T, >({
  getValue,
  row,
  column,
  table,
}: CellContext<T, any>) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <TextField
      value={value as string}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      variant="standard"
    />
  );
};

export default EditableCell;
