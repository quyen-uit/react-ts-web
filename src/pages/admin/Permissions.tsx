import React, { useState } from 'react';

import { Visibility, Sync } from '@mui/icons-material';
import { Box, IconButton, Button } from '@mui/material';
import {
  type Row,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
} from '@tanstack/react-table';
import { t } from 'i18next';

import { showConfirmAlert } from '@/components/alert';
import { FilterTable } from '@/components/table';
import {
  useGetPermissionsQuery,
  useCreatePermissionMutation,
} from '@/services/admin/permissionApi';
import type {
  Permission,
  CreatePermissionRequest,
} from '@/types/admin/permission.d';

import PermissionForm from './Permissions/PermissionForm/PermissionForm';

const Permissions: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPermission, setSelectedPermission] =
    useState<Permission | null>(null);

  const { data, isLoading } = useGetPermissionsQuery({
    pageNumber: 1,
    pageSize: 10,
  });
  const [createPermission] = useCreatePermissionMutation();

  const columns: ColumnDef<Permission>[] = [
    {
      accessorKey: 'name',
      header: t('permission.name'),
    },
    {
      accessorKey: 'description',
      header: t('permission.description'),
    },
    {
      accessorKey: 'module',
      header: t('permission.module'),
    },
    {
      accessorKey: 'action',
      header: t('permission.action'),
    },
  ];

  const handleAdd = () => {
    setSelectedPermission(null);
    setIsFormOpen(true);
  };

  const handleEdit = (permission: Permission) => {
    setSelectedPermission(permission);
    setIsFormOpen(true);
  };

  const handleDelete = (ids: string[]) => {
    // TODO: Implement delete mutation
    console.log('Deleting ids:', ids);
  };

  const handleDeleteConfirmation = (ids: string[]) => {
    showConfirmAlert({
      title: t('permission.confirm_deletion_title'),
      text: t('permission.confirm_deletion_message'),
      onConfirm: () => handleDelete(ids),
    });
  };

  const handleFormSubmit = async (permission: CreatePermissionRequest) => {
    if (selectedPermission) {
      // TODO: Implement update mutation
    } else {
      await createPermission(permission).unwrap();
    }
    setIsFormOpen(false);
  };

  const handleSearch = (filters: ColumnFiltersState, sorting: SortingState) => {
    console.log('Searching with filters:', filters);
    console.log('Searching with sorting:', sorting);
    // TODO: Implement API call here
  };

  return (
    <Box>
      <FilterTable<Permission>
        data={data?.data.data || []}
        columns={columns}
        onAdd={handleAdd}
        onDelete={handleDeleteConfirmation}
        onEdit={handleEdit}
        onSearch={handleSearch}
        title={t('permission.title')}
        rowActionNumber={1}
        loading={isLoading}
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
