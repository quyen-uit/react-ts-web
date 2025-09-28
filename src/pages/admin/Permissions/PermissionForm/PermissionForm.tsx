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
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { DynamicForm } from '@/components/form';
import type {
  Permission,
  CreatePermissionRequest,
} from '@/types/admin/permission.d';
import type { FormFieldConfig } from '@/types/form.d';

interface PermissionFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreatePermissionRequest) => void;
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

  const formFields: FormFieldConfig<CreatePermissionRequest>[] = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'description', label: 'Description', type: 'text' },
    { name: 'module', label: 'Module', type: 'text' },
    { name: 'action', label: 'Action', type: 'text' },
  ];

  const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    module: z.string().min(1, 'Module is required'),
    action: z.string().min(1, 'Action is required'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreatePermissionRequest>({
    resolver: zodResolver(schema),
    defaultValues: permission || {
      name: '',
      description: '',
      module: '',
      action: '',
    },
  });

  React.useEffect(() => {
    if (permission) {
      reset(permission);
    } else {
      reset({
        name: '',
        description: '',
        module: '',
        action: '',
      });
    }
  }, [permission, reset]);

  const handleFormSubmit = (data: CreatePermissionRequest) => {
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
