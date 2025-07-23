import { Box } from '@mui/material';
import React from 'react';
import Table from '../../components/common/Table';
import { columns, data } from './permissions';

const Permissions: React.FC = () => {
  return (
    <Box>
      <Table data={data} columns={columns} />
    </Box>
  );
};

export default Permissions;
