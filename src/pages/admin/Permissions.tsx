import React, { useState } from 'react';

import { Visibility, Sync } from '@mui/icons-material';
import { Box, IconButton, Button } from '@mui/material';
import { type Row } from '@tanstack/react-table';
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
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete this permission?',
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

  return (
    <Box>
      <FilterTable
        data={data}
        columns={columns}
        setData={setData}
        onAdd={handleAdd}
        onDelete={handleDeleteConfirmation}
        onEdit={handleEdit}
        title={t('Permission')}
        renderRowActions={(row: Row<Permission>) => (
          <IconButton onClick={() => console.log(row.original)}>
            <Visibility />
          </IconButton>
        )}
        extraActions={[
          {
            tooltip: 'Sync',
            element: (
              <Button
                variant="contained"
                startIcon={<Sync />}
                onClick={() => console.log('Sync')}
              >
                Sync
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
