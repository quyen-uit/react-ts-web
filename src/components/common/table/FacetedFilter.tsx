import {
  Box,
  Checkbox,
  Chip,
  MenuItem,
  Select,
  Typography,
  styled,
} from '@mui/material';
import type { Column, Table } from '@tanstack/react-table';
import React from 'react';

const SelectWrapper = styled(Box)(({ theme }) => ({
  minWidth: 120,
  fontSize: theme.typography.fontSize,
  '& .MuiSelect-select': {
    fontSize: theme.typography.fontSize,
  },
  '& .MuiTypography-root': {
    fontSize: theme.typography.fontSize,
  },
}));

interface FacetedFilterProps {
  column: Column<any, any>;
  table: Table<any>;
}

const FacetedFilter: React.FC<FacetedFilterProps> = ({ column, table }) => {
  const facetedValues = column.getFacetedUniqueValues();
  const { updateFilter } = table.options.meta as any;
  const { placeholder, type } = column.columnDef.meta as any;
  const isMultiple = type === 'multiple';

  if (isMultiple) {
    const selectedValues = (column.getFilterValue() as string[]) ?? [];
    return (
      <SelectWrapper>
        <Select
          multiple
          value={selectedValues}
          onChange={(e) => updateFilter(column.id, e.target.value)}
          displayEmpty
          variant="standard"
          renderValue={(selected) => {
            if (selected.length === 0) {
              return (
                <Typography color="textSecondary">{placeholder}</Typography>
              );
            }
            return (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {(selected as string[]).map((value) => (
                  <Chip key={value} label={value} size="small" />
                ))}
              </Box>
            );
          }}
        >
          {Array.from(facetedValues.keys()).map((value: any) => (
            <MenuItem
              sx={(theme) => ({ fontSize: theme.typography.fontSize })}
              key={value}
              value={value}
            >
              <Checkbox checked={selectedValues.indexOf(value) > -1} />
              {value} ({facetedValues.get(value)})
            </MenuItem>
          ))}
        </Select>
      </SelectWrapper>
    );
  }

  return (
    <SelectWrapper>
      <Select
        value={(column.getFilterValue() ?? '') as string}
        onChange={(e) => updateFilter(column.id, e.target.value)}
        displayEmpty
        variant="standard"
        renderValue={(selected) => {
          if (!selected) {
            return <Typography color="textSecondary">{placeholder}</Typography>;
          }
          return selected;
        }}
      >
        <MenuItem value="">All</MenuItem>
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

export default FacetedFilter;
