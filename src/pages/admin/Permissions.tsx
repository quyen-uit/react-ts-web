import { Box } from '@mui/material';
import React, { useState } from 'react';
import { columns, data as initialData } from './permissions.data';
import type { Permission } from './permissions.data';
import { FilterTable } from '@/components/ui/table';
import { t } from 'i18next';
const Permissions: React.FC = () => {
  const [data, setData] = useState<Permission[]>(initialData);

  const handleAdd = () => {
    const newRow: Permission = {
      id: data.length + 1,
      age: 0,
      city: '',
      state: '',
      startDate: '',
      startTime: '',
      createdAt: new Date().toISOString(),
      notes: '',
      tags: [],
      sample: '',
    };
    setData((prev) => [...prev, newRow]);
  };

  const handleDelete = (ids: string[]) => {
    setData((prev) => prev.filter((row) => !ids.includes(String(row.id))));
  };

  return (
    <Box>
      <FilterTable
        data={data}
        columns={columns}
        setData={setData}
        onAdd={handleAdd}
        onDelete={handleDelete}
        title={t('Permission')}
      />
    </Box>
  );
};

export default Permissions;
