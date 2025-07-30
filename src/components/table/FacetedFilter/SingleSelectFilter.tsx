import { MenuItem, Select, Typography } from '@mui/material';
import type { Column, Table } from '@tanstack/react-table';
import { t } from 'i18next';
import React from 'react';
import { SelectWrapper } from './FacetedFilter.style';
import { ClearIconButton } from '../../icon';

interface SingleSelectFilterProps {
  column: Column<any, any>;
  table: Table<any>;
}

export const SingleSelectFilter: React.FC<SingleSelectFilterProps> = ({
  column,
  table,
}) => {
  const facetedValues = column.getFacetedUniqueValues();
  const { updateFilter } = table.options.meta as any;
  const { placeholder } = column.columnDef.meta as any;
  const filterValue = column.getFilterValue();

  return (
    <SelectWrapper>
      <Select
        value={(filterValue ?? '') as string}
        onChange={(e) => updateFilter(column.id, e.target.value)}
        displayEmpty
        variant="standard"
        renderValue={(selected) => {
          if (!selected) {
            return (
              <Typography color="text.secondary">{placeholder}</Typography>
            );
          }
          return selected;
        }}
        endAdornment={
          <ClearIconButton
            visible={!!filterValue}
            onClick={() => updateFilter(column.id, undefined)}
            marginRight={2.5}
          />
        }
      >
        <MenuItem value="">{t('All')}</MenuItem>
        {Array.from(facetedValues.keys()).map((value: any) => (
          <MenuItem
            key={value}
            value={value}
            sx={(theme) => ({ fontSize: theme.typography.fontSize })}
          >
            {value} ({facetedValues.get(value)})
          </MenuItem>
        ))}
      </Select>
    </SelectWrapper>
  );
};
