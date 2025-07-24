import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import Table from '../../components/common/table/Table';
import { columns, data as initialData } from './permissions';
import type { Permission } from './permissions';

const Permissions: React.FC = () => {
  const [data, setData] = React.useState<Permission[]>(initialData);
  const [isTableVisible, setTableVisible] = useState(true);

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
      <Button onClick={() => setTableVisible(!isTableVisible)} sx={{ mb: 2 }}>
        {isTableVisible ? 'Hide Table' : 'Show Table'}
      </Button>
      {isTableVisible ? (
        <Table
          data={data}
          columns={columns}
          setData={setData}
          onAdd={handleAdd}
          onDelete={handleDelete}
        />
      ) : (
        <Typography>Table is hidden</Typography>
      )}
    </Box>
  );
};

export default Permissions;
