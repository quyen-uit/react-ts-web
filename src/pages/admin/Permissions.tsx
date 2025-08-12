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
import {
  useGetPermissionsQuery,
  useCreatePermissionMutation,
} from '@/services/admin/permissionApi';
import type {
  Permission,
  CreatePermissionRequest,
  PermissionFilter,
} from '@/types/admin/permission.d';

import PermissionForm from './Permissions/PermissionForm/PermissionForm';
import { columns } from './permissions.data';

const Permissions: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPermission, setSelectedPermission] =
    useState<Permission | null>(null);
  const [searchParams, setSearchParams] = useState({
    pageNumber: 0,
    pageSize: 10,
  });

  const { data, isLoading } = useGetPermissionsQuery(searchParams, {
    refetchOnMountOrArgChange: true,
  });
  const [createPermission] = useCreatePermissionMutation();

  const handleAdd = () => {
    setSelectedPermission(null);
    setIsFormOpen(true);
  };

  const handleEdit = (permission: Permission) => {
    setSelectedPermission(permission);
    setIsFormOpen(true);
  };

  const handleDelete = (ids: string[]) => {
    console.log('Deleting permissions with IDs:', ids);
    // TODO: Implement delete mutation
  };

  const handleDeleteConfirmation = (ids: string[]) => {
    showConfirmAlert({
      title: t('permission.confirm_deletion_title'),
      text: t('permission.confirm_deletion_message'),
      onConfirm: () => handleDelete(ids),
    });
  };

  const handleFormSubmit = async (permission: Permission) => {
    if (selectedPermission) {
      // TODO: Implement update mutation
    } else {
      await createPermission(permission as CreatePermissionRequest);
    }
    setIsFormOpen(false);
  };

  const handleSearch = (filters: ColumnFiltersState, sorting: SortingState) => {
    const filter = filters.reduce((acc: PermissionFilter, { id, value }) => {
      acc[id as keyof PermissionFilter] = value as string;
      return acc;
    }, {});
    const sort = sorting
      .map((s) => `${s.id},${s.desc ? 'desc' : 'asc'}`)
      .join(',');
    setSearchParams((prev) => ({ ...prev, filter, sort }));
  };

  return (
    <Box>
      <FilterTable<Permission>
        data={data?.data?.data || []}
        columns={columns}
        onAdd={handleAdd}
        onDelete={handleDeleteConfirmation}
        onEdit={handleEdit}
        onSearch={handleSearch}
        setData={() => {}}
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
