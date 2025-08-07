'use no memo';
import { useState } from 'react';

import {
  Add as AddIcon,
  Delete as DeleteIcon,
  DensityLarge as DensityLargeIcon,
  DensityMedium as DensityMediumIcon,
  DensitySmall as DensitySmallIcon,
  FilterList as FilterListIcon,
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
  ViewColumn as ViewColumnIcon,
} from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import {
  Checkbox,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import type { Table } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

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
  density: number;
  onDensityChange: (density: number) => void;
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
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDensityToggle = () => {
    const nextIndex = (density + 1) % 3;
    onDensityChange(nextIndex);
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
        placeholder={t('table_toolbar.search_placeholder')}
      />
      <Tooltip title={t('table_toolbar.toggle_column_visibility')}>
        <IconButton onClick={handleMenuOpen} color="primary">
          <ViewColumnIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem>
          <Checkbox
            checked={table.getIsAllColumnsVisible()}
            onChange={table.getToggleAllColumnsVisibilityHandler()}
          />
          {t('table_toolbar.toggle_all')}
        </MenuItem>
        <Divider />
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
      <Tooltip title={t('table_toolbar.toggle_density')}>
        <IconButton onClick={handleDensityToggle} color="primary">
          {density === 0 && <DensitySmallIcon fontSize="small" />}
          {density === 1 && <DensityMediumIcon fontSize="small" />}
          {density === 2 && <DensityLargeIcon fontSize="small" />}
        </IconButton>
      </Tooltip>
      {allowFullscreen && (
        <Tooltip title={t('table_toolbar.toggle_fullscreen')}>
          <IconButton onClick={toggleFullScreen} color="primary">
            {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
        </Tooltip>
      )}
      {allowFiltering && (
        <Tooltip title={t('table_toolbar.filter')} color="primary">
          <IconButton onClick={toggleFilter}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
      {onAdd && (
        <Tooltip title={t('table_toolbar.add')}>
          <IconButton onClick={onAdd}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}
      {onDelete && (
        <Tooltip title={t('table_toolbar.remove_selected')}>
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
