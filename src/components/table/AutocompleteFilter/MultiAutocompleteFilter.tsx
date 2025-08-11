import {
  Autocomplete,
  Checkbox,
  TextField,
  FormControlLabel,
  Typography,
  Chip,
} from '@mui/material';
import type {
  Column,
  ColumnMeta,
  Table,
  TableMeta,
} from '@tanstack/react-table';

import type { Option } from '@/types/common';

export interface MultiAutocompleteFilterProps<TData extends object, TValue> {
  column: Column<TData, TValue>;
  table: Table<TData>;
}

export function MultiAutocompleteFilter<TData extends object, TValue>({
  column,
  table,
}: MultiAutocompleteFilterProps<TData, TValue>) {
  const { updateFilter } = table.options.meta as TableMeta<TData>;
  const { placeholder, options } = column.columnDef.meta as ColumnMeta<
    TData,
    TValue
  >;

  return (
    <Autocomplete
      multiple
      fullWidth
      disableCloseOnSelect
      options={options || []}
      getOptionLabel={(option: Option) => option.label}
      onChange={(_, values: Option[]) =>
        updateFilter(
          column.id,
          values.map((v) => v.value)
        )
      }
      renderOption={(props, option, { selected }) => (
        <li {...props} key={props.key}>
          <FormControlLabel
            control={<Checkbox checked={selected} />}
            label={<Typography fontSize={14}>{option.label}</Typography>}
          />
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          variant="standard"
          sx={(theme) => ({
            fontSize: theme.typography.fontSize,
            '& .MuiInputBase-input': {
              fontSize: theme.typography.fontSize,
            },
          })}
        />
      )}
      renderValue={(values, getItemProps) =>
        values.map((option, index) => {
          const { key, ...itemProps } = getItemProps({ index });
          return (
            <Chip
              key={key}
              variant="filled"
              label={option.label}
              size="small"
              color="primary"
              {...itemProps}
              sx={{ height: 16, fontSize: 12 }}
            />
          );
        })
      }
    />
  );
}
