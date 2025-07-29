import { Close } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material';
import { forwardRef, useCallback, useState } from 'react';
import type { ChangeEvent } from 'react';

const ClearableTextField = forwardRef<HTMLDivElement, TextFieldProps>(
  (props, ref) => {
    const { value: initialValue, onChange, ...rest } = props;
    const [value, setValue] = useState(initialValue || '');

    const handleClear = useCallback(() => {
      setValue('');
      if (onChange) {
        const event = {
          target: {
            value: '',
          },
        } as ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    }, [onChange]);

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        if (onChange) {
          onChange(event);
        }
      },
      [onChange]
    );

    return (
      <TextField
        {...rest}
        ref={ref}
        value={value}
        onChange={handleChange}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                {value && (
                  <IconButton onClick={handleClear} edge="end">
                    <Close />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          },
        }}
      />
    );
  }
);

ClearableTextField.displayName = 'ClearableTextField';

export default ClearableTextField;
