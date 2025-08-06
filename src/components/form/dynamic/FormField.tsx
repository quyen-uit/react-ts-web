import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import type { ColumnDef } from '@tanstack/react-table';
import type { Control, FieldErrors } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import ClearableTextField from '@/components/input/ClearableTextField/ClearableTextField';
import CustomDatePicker from '@/components/input/CustomDatePicker/CustomDatePicker';
import CustomDateTimePicker from '@/components/input/CustomDateTimePicker/CustomDateTimePicker';
import CustomTimePicker from '@/components/input/CustomTimePicker/CustomTimePicker';
import { MultipleSelect } from '@/components/input/MultipleSelect/MultipleSelect';
import { SingleSelect } from '@/components/input/SingleSelect/SingleSelect';

interface FormFieldProps<T extends Record<string, any>> {
  column: ColumnDef<T>;
  control: Control<T>;
  errors: FieldErrors<T>;
}

const FormField = <T extends Record<string, any>>({
  column,
  control,
  errors,
}: FormFieldProps<T>) => {
  const { accessorKey, header, meta } = column as any;
  const error = errors[accessorKey];

  const renderInput = (field: any) => {
    switch (meta?.type) {
      case 'text':
        return (
          <ClearableTextField
            {...field}
            label={header}
            error={!!error}
            helperText={error?.message as string}
          />
        );
      case 'boolean':
        return (
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label={header}
          />
        );
      case 'option':
        return (
          <SingleSelect
            {...field}
            label={header}
            options={meta.options || []}
          />
        );
      case 'multiple':
        return (
          <MultipleSelect
            {...field}
            label={header}
            options={meta.options || []}
          />
        );
      case 'date':
        return <CustomDatePicker {...field} label={header} />;
      case 'time':
        return <CustomTimePicker {...field} label={header} />;
      case 'datetime':
        return <CustomDateTimePicker {...field} label={header} />;
      default:
        return (
          <TextField
            {...field}
            label={header}
            error={!!error}
            helperText={error?.message as string}
          />
        );
    }
  };

  return (
    <Controller
      name={accessorKey}
      control={control}
      render={({ field }) => renderInput(field)}
    />
  );
};

export default FormField;
