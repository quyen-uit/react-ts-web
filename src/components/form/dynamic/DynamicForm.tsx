import type { Control, FieldErrors } from 'react-hook-form';

import type { FormFieldConfig } from '@/types/form.d';

import FormField from './FormField';

interface DynamicFormProps<T extends Record<string, any>> {
  formFields: FormFieldConfig<T>[];
  control: Control<T>;
  errors: FieldErrors<T>;
}

const DynamicForm = <T extends Record<string, any>>({
  formFields,
  control,
  errors,
}: DynamicFormProps<T>) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {formFields.map((field) => {
        const colSpan = field.colSpan || 1;

        return (
          <div key={field.name as string} className={`col-span-${colSpan}`}>
            <FormField field={field} control={control} errors={errors} />
          </div>
        );
      })}
    </div>
  );
};

export default DynamicForm;
