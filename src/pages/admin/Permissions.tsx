import { Box } from '@mui/material';
import React, { useState } from 'react';
import { columns, data as initialData } from './permissions.data';
import type { Permission } from './permissions.data';
import { FilterTable } from '@/components/table';
import { t } from 'i18next';
import PermissionForm from './Permissions/PermissionForm/PermissionForm';

const Permissions: React.FC = () => {
  const [data, setData] = useState<Permission[]>(initialData);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null);

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

  const handleFormSubmit = (permission: Permission) => {
    if (selectedPermission) {
      setData((prev) =>
        prev.map((p) => (p.id === permission.id ? permission : p))
      );
    } else {
      setData((prev) => [
        ...prev,
        { ...permission, id: data.length + 1, createdAt: new Date().toISOString() },
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
        onDelete={handleDelete}
        onEdit={handleEdit}
        title={t('Permission')}
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
