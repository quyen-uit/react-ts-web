import { Checkbox, Chip, MenuItem, Select, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { Close } from '@mui/icons-material';
import type { Column, Table } from '@tanstack/react-table';
import React from 'react';
import { SelectWrapper } from './FacetedFilter.style';
import { ClearIconButton } from '@/styles';

interface MultipleSelectFilterProps {
  column: Column<any, any>;
  table: Table<any>;
}

export const MultipleSelectFilter: React.FC<MultipleSelectFilterProps> = ({
  column,
  table,
}) => {
  const facetedValues = column.getFacetedUniqueValues();
  const { updateFilter } = table.options.meta as any;
  const { placeholder } = column.columnDef.meta as any;

  const allValues = Array.from(facetedValues.keys());
  const selectedValues = (column.getFilterValue() as string[]) ?? [];

  const handleRemoveChip = (valueToRemove: string) => {
    const newValues = selectedValues.filter((v) => v !== valueToRemove);
    updateFilter(column.id, newValues);
  };

  return (
    <SelectWrapper>
      <Select
        multiple
        value={selectedValues}
        onChange={(e) => updateFilter(column.id, e.target.value)}
        displayEmpty
        variant="standard"
        endAdornment={
          <ClearIconButton
            visible={!!selectedValues.length}
            onClick={() => updateFilter(column.id, undefined)}
            marginRight={16}
          >
            <Close />
          </ClearIconButton>
        }
        renderValue={(selected) => {
          const values = selected as string[];
          if (values.length === 0) {
            return (
              <Typography color="text.secondary">{placeholder}</Typography>
            );
          }
          return (
            <>
              {values.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  size="small"
                  onDelete={(e) => {
                    e.preventDefault();
                    handleRemoveChip(value);
                  }}
                  deleteIcon={<CancelIcon />}
                />
              ))}
            </>
          );
        }}
      >
        {allValues.map((value: any) => (
          <MenuItem
            key={value}
            value={value}
            sx={(theme) => ({ fontSize: theme.typography.fontSize })}
          >
            <Checkbox checked={selectedValues.includes(value)} />
            {value} ({facetedValues.get(value)})
          </MenuItem>
        ))}
      </Select>
    </SelectWrapper>
  );
};
