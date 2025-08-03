import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';

import type { Permission } from '../../permissions.data';

const permissionSchema = z.object({
  id: z.number(),
  age: z.number().min(1, 'Age is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  startDate: z.string().min(1, 'Start date is required'),
  startTime: z.string().min(1, 'Start time is required'),
  createdAt: z.string(),
  notes: z.string(),
  tags: z.array(z.string()),
  sample: z.string(),
});

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
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Permission>({
    resolver: zodResolver(permissionSchema),
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
          <Controller
            name="age"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Age"
                type="number"
                fullWidth
                error={!!errors.age}
                helperText={errors.age?.message}
                onChange={(e) => field.onChange(Number(e.target.value))}
                sx={{ mb: 2 }}
              />
            )}
          />
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="City"
                fullWidth
                error={!!errors.city}
                helperText={errors.city?.message}
                sx={{ mb: 2 }}
              />
            )}
          />
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="State"
                fullWidth
                error={!!errors.state}
                helperText={errors.state?.message}
                sx={{ mb: 2 }}
              />
            )}
          />
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Start Date"
                type="date"
                fullWidth
                error={!!errors.startDate}
                helperText={errors.startDate?.message}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ mb: 2 }}
              />
            )}
          />
          <Controller
            name="startTime"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Start Time"
                type="time"
                fullWidth
                error={!!errors.startTime}
                helperText={errors.startTime?.message}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ mb: 2 }}
              />
            )}
          />
          <Controller
            name="notes"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Notes"
                fullWidth
                multiline
                rows={4}
                error={!!errors.notes}
                helperText={errors.notes?.message}
              />
            )}
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
