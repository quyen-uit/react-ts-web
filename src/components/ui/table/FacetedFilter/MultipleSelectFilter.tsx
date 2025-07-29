import {
  Box,
  Checkbox,
  Chip,
  IconButton,
  ListSubheader,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import CancelIcon from '@mui/icons-material/Cancel';
import { Close } from '@mui/icons-material';
import type { Column, Table } from '@tanstack/react-table';
import React from 'react';
import { SelectWrapper } from './FacetedFilter.style';

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
  const allSelected = selectedValues.length === allValues.length;

  const handleRemoveChip = (valueToRemove: string) => {
    const newValues = selectedValues.filter((v) => v !== valueToRemove);
    updateFilter(column.id, newValues);
  };

  const handleToggleAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateFilter(column.id, allSelected ? [] : allValues);
  };

  return (
    <SelectWrapper>
      <Select
        multiple
        value={selectedValues}
        onChange={(e) => updateFilter(column.id, e.target.value)}
        displayEmpty
        variant="standard"
        renderValue={(selected) => {
          const values = selected as string[];
          if (values.length === 0) {
            return <Typography>{placeholder}</Typography>;
          }
          return (
            <>
              {values.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  size="small"
                  onDelete={(e) => {
                    e.stopPropagation();
                    handleRemoveChip(value);
                  }}
                  deleteIcon={<CancelIcon />}
                />
              ))}
            </>
          );
        }}
      >
        <ListSubheader disableSticky>
          <Box>
            <IconButton
              size="small"
              onClick={handleToggleAll}
              title={allSelected ? 'Clear All' : 'Select All'}
            >
              {allSelected ? (
                <ClearAllIcon fontSize="small" />
              ) : (
                <SelectAllIcon fontSize="small" />
              )}
            </IconButton>
          </Box>
        </ListSubheader>

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
      {selectedValues.length > 0 && (
        <IconButton onClick={() => updateFilter(column.id, [])} size="small">
          <Close />
        </IconButton>
      )}
    </SelectWrapper>
  );
};
