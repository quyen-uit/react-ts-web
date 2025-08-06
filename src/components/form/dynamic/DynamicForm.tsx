import type { ColumnDef } from '@tanstack/react-table';
import type { Control, FieldErrors } from 'react-hook-form';

import FormField from './FormField';

interface DynamicFormProps<T extends Record<string, any>> {
  columns: ColumnDef<T>[];
  control: Control<T>;
  errors: FieldErrors<T>;
}

const DynamicForm = <T extends Record<string, any>>({
  columns,
  control,
  errors,
}: DynamicFormProps<T>) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {columns.map((column) => {
        const accessorKey = (column as { accessorKey: keyof T })?.accessorKey;
        if (!accessorKey) return null;

        const colSpan = column.meta?.colSpan || 1;

        return (
          <div key={accessorKey as string} className={`col-span-${colSpan}`}>
            <FormField column={column} control={control} errors={errors} />
          </div>
        );
      })}
    </div>
  );
};

export default DynamicForm;
