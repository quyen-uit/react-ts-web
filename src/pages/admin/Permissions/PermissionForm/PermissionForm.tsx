import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import type { ColumnDef } from '@tanstack/react-table';
import { useForm } from 'react-hook-form';

import { DynamicForm } from '@/components/form';
import { generateZodSchema } from '@/shared/utils/schema.utils';
import type { FormFieldConfig, FormFieldType } from '@/types/form.d';

import { columns, type Permission } from '../../permissions.data';

interface PermissionFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Permission) => void;
  permission?: Permission | null;
}

const PermissionForm: React.FC<PermissionFormProps> = ({
  open,
  onClose,
  onSubmit,
  permission,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const formFields: FormFieldConfig<Permission>[] = columns.map((column) => {
    const typedColumn = column as ColumnDef<Permission> & {
      accessorKey?: keyof Permission;
      meta?: { colSpan?: number; type?: FormFieldType };
    };
    return {
      name: typedColumn.accessorKey as keyof Permission,
      label: typedColumn.header as string,
      type: typedColumn.meta?.type || 'text', // Default to 'text' if type is not specified
      colSpan: typedColumn.meta?.colSpan || 1,
    };
  });

  const schema = generateZodSchema(columns);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Permission>({
    resolver: zodResolver(schema as any),
    defaultValues: permission || {
      id: 0,
      age: 0,
      city: '',
      state: '',
      startDate: '',
      startTime: '',
      createdAt: '',
      notes: '',
      tags: [],
      sample: '',
    },
  });

  React.useEffect(() => {
    if (permission) {
      reset(permission);
    } else {
      reset({
        id: 0,
        age: 0,
        city: '',
        state: '',
        startDate: '',
        startTime: '',
        createdAt: '',
        notes: '',
        tags: [],
        sample: '',
      });
    }
  }, [permission, reset]);

  const handleFormSubmit = (data: Permission) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {permission ? 'Edit Permission' : 'Add Permission'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1 }}>
          <DynamicForm
            formFields={formFields}
            control={control}
            errors={errors}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit(handleFormSubmit)} variant="contained">
          {permission ? 'Save' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PermissionForm;
