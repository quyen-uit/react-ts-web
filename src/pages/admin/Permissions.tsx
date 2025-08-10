import React, { useState } from 'react';

import { Visibility, Sync } from '@mui/icons-material';
import { Box, IconButton, Button } from '@mui/material';
import {
  type Row,
  type ColumnFiltersState,
  type SortingState,
} from '@tanstack/react-table';
import { t } from 'i18next';

import { showConfirmAlert } from '@/components/alert';
import { FilterTable } from '@/components/table';

import PermissionForm from './Permissions/PermissionForm/PermissionForm';
import { columns, data as initialData } from './permissions.data';
import type { Permission } from './permissions.data';

const Permissions: React.FC = () => {
  const [data, setData] = useState<Permission[]>(initialData);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPermission, setSelectedPermission] =
    useState<Permission | null>(null);

  const handleAdd = () => {
    setSelectedPermission(null);
    setIsFormOpen(true);
  };

  const handleEdit = (permission: Permission) => {
    setSelectedPermission(permission);
    setIsFormOpen(true);
  };

  const handleDelete = (ids: string[]) => {
    setData((prev) => prev.filter((row) => !ids.includes(String(row.id))));
  };

  const handleDeleteConfirmation = (ids: string[]) => {
    showConfirmAlert({
      title: t('permission.confirm_deletion_title'),
      text: t('permission.confirm_deletion_message'),
      onConfirm: () => handleDelete(ids),
    });
  };

  const handleFormSubmit = (permission: Permission) => {
    if (selectedPermission) {
      setData((prev) =>
        prev.map((p) => (p.id === permission.id ? permission : p))
      );
    } else {
      setData((prev) => [
        ...prev,
        {
          ...permission,
          id: data.length + 1,
          createdAt: new Date().toISOString(),
        },
      ]);
    }
  };

  const handleSearch = (filters: ColumnFiltersState, sorting: SortingState) => {
    console.log('Searching with filters:', filters);
    console.log('Searching with sorting:', sorting);
    // TODO: Implement API call here
  };

  return (
    <Box>
      <FilterTable
        data={data}
        columns={columns}
        setData={setData}
        onAdd={handleAdd}
        onDelete={handleDeleteConfirmation}
        onEdit={handleEdit}
        onSearch={handleSearch}
        title={t('permission.title')}
        rowActionNumber={1}
        renderRowActions={(row: Row<Permission>) => [
          <IconButton key={row.id} onClick={() => console.log(row.original)}>
            <Visibility />
          </IconButton>,
        ]}
        extraActions={[
          {
            tooltip: t('permission.sync'),
            element: (
              <Button
                variant="contained"
                startIcon={<Sync />}
                onClick={() => console.log('Sync')}
              >
                {t('permission.sync')}
              </Button>
            ),
          },
        ]}
      />
      <PermissionForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        permission={selectedPermission}
      />
    </Box>
  );
};

export default Permissions;
