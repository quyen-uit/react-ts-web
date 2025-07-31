import {
  CustomDatePicker,
  CustomDateTimePicker,
  CustomTimePicker,
  MultipleSelect,
  SingleSelect,
} from '@/components/input';
import { Checkbox, TextField } from '@mui/material';
import type { CellContext } from '@tanstack/react-table';
import { useEffect, useState } from 'react';


const EditableCell = <T,>({
  getValue,
  row,
  column,
  table,
  isEditing,
}: CellContext<T, any> & { isEditing?: boolean }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  const {
    updateData, // This is a custom function that we supplied to our table instance
  } = table.options.meta ?? {};
  const { type, options } = column.columnDef.meta ?? {};

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    updateData?.(row.index, column.id, value);
  };

  const renderInput = () => {
    switch (type) {
      case 'number':
        return (
          <TextField
            value={value as string}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
            type="number"
            variant="standard"
          />
        );
      case 'date':
        return (
          <CustomDatePicker
            value={value}
            onChange={(date) => setValue(date)}
            onAccept={onBlur}
          />
        );
      case 'time':
        return (
          <CustomTimePicker
            value={value}
            onChange={(time) => setValue(time)}
            onAccept={onBlur}
          />
        );
      case 'datetime':
        return (
          <CustomDateTimePicker
            value={value}
            onChange={(datetime) => setValue(datetime)}
            onAccept={onBlur}
          />
        );
      case 'boolean':
        return (
          <Checkbox
            checked={value}
            onChange={(e) => setValue(e.target.checked)}
            onBlur={onBlur}
          />
        );
      case 'option':
        return (
          <SingleSelect
            value={value}
            onChange={(newValue: any) => {
              setValue(newValue);
              updateData?.(row.index, column.id, newValue);
            }}
            options={options ?? []}
          />
        );
      case 'multiple':
        return (
          <MultipleSelect
            selectedValues={value}
            onChange={(newValue: string[]) => {
              setValue(newValue);
              updateData?.(row.index, column.id, newValue);
            }}
            options={options ?? []}
          />
        );
      default:
        return (
          <TextField
            value={value as string}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
            variant="standard"
          />
        );
    }
  };

  return isEditing ? renderInput() : <span>{value}</span>;
};

export default EditableCell;
