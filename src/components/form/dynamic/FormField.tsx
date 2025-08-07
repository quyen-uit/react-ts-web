import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import type { Control, FieldErrors, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import ClearableTextField from '@/components/input/ClearableTextField/ClearableTextField';
import CustomDatePicker from '@/components/input/CustomDatePicker/CustomDatePicker';
import CustomDateTimePicker from '@/components/input/CustomDateTimePicker/CustomDateTimePicker';
import CustomTimePicker from '@/components/input/CustomTimePicker/CustomTimePicker';
import { MultipleSelect } from '@/components/input/MultipleSelect/MultipleSelect';
import { SingleSelect } from '@/components/input/SingleSelect/SingleSelect';
import type { FormFieldConfig } from '@/types/form.d';

interface FormFieldProps<T extends Record<string, any>> {
  field: FormFieldConfig<T>;
  control: Control<T>;
  errors: FieldErrors<T>;
}

const FormField = <T extends Record<string, any>>({
  field,
  control,
  errors,
}: FormFieldProps<T>) => {
  const error = errors[field.name];

  const renderInput = (controllerField: any) => {
    switch (field.type) {
      case 'text':
        return (
          <ClearableTextField
            {...controllerField}
            label={field.label}
            error={!!error}
            helperText={error?.message as string}
          />
        );
      case 'boolean':
        return (
          <FormControlLabel
            control={
              <Checkbox {...controllerField} checked={controllerField.value} />
            }
            label={field.label}
          />
        );
      case 'option':
        return (
          <SingleSelect
            {...controllerField}
            label={field.label}
            options={field.options || []}
          />
        );
      case 'multiple':
        return (
          <MultipleSelect
            {...controllerField}
            label={field.label}
            options={field.options || []}
          />
        );
      case 'date':
        return <CustomDatePicker {...controllerField} label={field.label} />;
      case 'time':
        return <CustomTimePicker {...controllerField} label={field.label} />;
      case 'datetime':
        return (
          <CustomDateTimePicker {...controllerField} label={field.label} />
        );
      default:
        return (
          <TextField
            {...controllerField}
            label={field.label}
            error={!!error}
            helperText={error?.message as string}
          />
        );
    }
  };

  return (
    <Controller
      name={field.name as Path<T>}
      control={control}
      render={({ field: controllerField }) => renderInput(controllerField)}
    />
  );
};

export default FormField;
