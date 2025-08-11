import { Autocomplete, TextField } from '@mui/material';
import type {
  Column,
  ColumnMeta,
  Table,
  TableMeta,
} from '@tanstack/react-table';

import type { Option } from '@/types/common';

export interface SingleAutocompleteFilterProps<TData extends object, TValue> {
  column: Column<TData, TValue>;
  table: Table<TData>;
}

export function SingleAutocompleteFilter<TData extends object, TValue>({
  column,
  table,
}: SingleAutocompleteFilterProps<TData, TValue>) {
  const { updateFilter } = table.options.meta as TableMeta<TData>;
  const { placeholder, options } = column.columnDef.meta as ColumnMeta<
    TData,
    TValue
  >;

  return (
    <Autocomplete
      fullWidth
      getOptionLabel={(option: Option) => option.label}
      onChange={(_, value: Option | null) =>
        updateFilter(column.id, (value && value.value) ?? '')
      }
      options={options || []}
      slotProps={{
        popper: {
          sx: {
            '& .MuiAutocomplete-option': {
              fontSize: '0.875rem',
            },
          },
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          variant={'standard'}
          sx={(theme) => ({
            marginBottom: 1,
            fontSize: theme.typography.fontSize,
            '& .MuiInputBase-input': {
              fontSize: theme.typography.fontSize,
            },
          })}
        />
      )}
    />
  );
}
