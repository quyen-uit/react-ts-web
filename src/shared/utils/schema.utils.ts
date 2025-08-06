import type { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function generateZodSchema<T extends Record<string, any>>(
  columns: ColumnDef<T>[]
) {
  const schema = columns.reduce(
    (acc, column) => {
      const key = (column as { accessorKey: keyof T }).accessorKey;
      if (!key) {
        return acc;
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const type = column.meta?.type;
      let fieldSchema;

      switch (type) {
        case 'text':
          fieldSchema = z.string().min(1, 'This field is required');
          break;
        case 'boolean':
          fieldSchema = z.boolean();
          break;
        case 'option':
          fieldSchema = z.string().min(1, 'Please select an option');
          break;
        case 'multiple':
          fieldSchema = z
            .array(z.string())
            .min(1, 'Please select at least one option');
          break;
        case 'date':
          fieldSchema = z.string().refine((val) => !isNaN(Date.parse(val)), {
            message: 'Invalid date format',
          });
          break;
        case 'time':
          fieldSchema = z
            .string()
            .refine((val) => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(val), {
              message: 'Invalid time format (HH:MM)',
            });
          break;
        case 'datetime':
          fieldSchema = z
            .string()
            .datetime({ message: 'Invalid datetime format' });
          break;
        default:
          fieldSchema = z.any();
          break;
      }

      return { ...acc, [key]: fieldSchema };
    },
    {} as { [K in keyof T]: z.ZodTypeAny }
  );

  return z.object(schema);
}
