import { forwardRef, useCallback, useState } from 'react';
import type { ChangeEvent } from 'react';

import { InputAdornment, TextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material';

import { ClearIconButton } from '@/components/icon';

const ClearableTextField = forwardRef<HTMLDivElement, TextFieldProps>(
  (props, ref) => {
    const { value: initialValue, onChange, ...rest } = props;
    const [value, setValue] = useState(initialValue || '');
    const [clearable, setClearable] = useState(false);

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

    const handleClearable = useCallback(() => {
      if (value) {
        setClearable(true);
      }
    }, [value]);

    const handleUnclearable = useCallback(() => {
      setClearable(false);
    }, []);

    return (
      <TextField
        {...rest}
        ref={ref}
        value={value}
        onChange={handleChange}
        onMouseOut={handleUnclearable}
        onMouseOver={handleClearable}
        onKeyUp={handleClearable}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <ClearIconButton onClick={handleClear} visible={clearable} />
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
