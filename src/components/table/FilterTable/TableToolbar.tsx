import { useState } from 'react';

import {
  ViewColumn as ViewColumnIcon,
  FilterList as FilterListIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
  DensitySmall as DensitySmallIcon,
  DensityMedium as DensityMediumIcon,
  DensityLarge as DensityLargeIcon,
} from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import {
  Toolbar,
  Typography,
  TextField,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Checkbox,
} from '@mui/material';
import type { Table } from '@tanstack/react-table';

import { ToolbarTitle } from './FilterTable.style';

export interface ExtraAction {
  element: React.ReactElement;
  tooltip: string;
}

interface TableToolbarProps<T> {
  table: Table<T>;
  title: string;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  onAdd?: () => void;
  onDelete?: (ids: string[]) => void;
  allowFullscreen?: boolean;
  isFullScreen: boolean;
  toggleFullScreen: () => void;
  allowFiltering?: boolean;
  isFilter: boolean;
  toggleFilter: () => void;
  extraActions?: ExtraAction[];
  density: 'compact' | 'standard' | 'comfortable';
  onDensityChange: (density: 'compact' | 'standard' | 'comfortable') => void;
}

export const TableToolbar = <T,>({
  table,
  title,
  globalFilter,
  setGlobalFilter,
  onAdd,
  onDelete,
  allowFullscreen,
  isFullScreen,
  toggleFullScreen,
  allowFiltering,
  isFilter,
  toggleFilter,
  extraActions,
  density,
  onDensityChange,
}: TableToolbarProps<T>) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDensityToggle = () => {
    const densities: ('compact' | 'standard' | 'comfortable')[] = [
      'compact',
      'standard',
      'comfortable',
    ];
    const currentIndex = densities.indexOf(density);
    const nextIndex = (currentIndex + 1) % densities.length;
    onDensityChange(densities[nextIndex]);
  };

  return (
    <Toolbar>
      <ToolbarTitle>
        <Typography variant="h5" fontWeight={700} component="div">
          {title}
        </Typography>
        {isFilter && (
          <IconButton aria-label="search">
            <SearchIcon color="primary" />
          </IconButton>
        )}
      </ToolbarTitle>

      <TextField
        value={globalFilter ?? ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        variant="standard"
        placeholder="Search"
      />
      <Tooltip title="Toggle Column Visibility">
        <IconButton onClick={handleMenuOpen} color="primary">
          <ViewColumnIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {table.getAllLeafColumns().map((column) => (
          <MenuItem key={column.id}>
            <Checkbox
              checked={column.getIsVisible()}
              onChange={column.getToggleVisibilityHandler()}
            />
            {column.id}
          </MenuItem>
        ))}
      </Menu>
      <Tooltip title="Toggle Density">
        <IconButton onClick={handleDensityToggle} color="primary">
          {density === 'compact' && <DensitySmallIcon />}
          {density === 'standard' && <DensityMediumIcon />}
          {density === 'comfortable' && <DensityLargeIcon />}
        </IconButton>
      </Tooltip>
      {allowFullscreen && (
        <Tooltip title="Toggle Fullscreen">
          <IconButton onClick={toggleFullScreen} color="primary">
            {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
        </Tooltip>
      )}
      {allowFiltering && (
        <Tooltip title="Filter" color="primary">
          <IconButton onClick={toggleFilter}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
      {onAdd && (
        <Tooltip title="Add">
          <IconButton onClick={onAdd}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}
      {onDelete && (
        <Tooltip title="Remove Selected">
          <IconButton
            onClick={() => {
              const selectedIds = table
                .getSelectedRowModel()
                .rows.map((row) => (row.original as { id: string }).id);
              onDelete(selectedIds);
            }}
            disabled={table.getSelectedRowModel().rows.length === 0}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
      {extraActions &&
        extraActions.map((action, index) => (
          <Tooltip title={action.tooltip} key={index}>
            {action.element}
          </Tooltip>
        ))}
    </Toolbar>
  );
};
