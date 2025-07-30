import React, { useState } from 'react';
import Checkbox, { type CheckboxProps } from '@mui/material/Checkbox';

interface TernaryCheckboxProps extends CheckboxProps {
  onValueChange?: (value: boolean | null) => void;
}

const TernaryCheckbox: React.FC<TernaryCheckboxProps> = ({
  onValueChange,
  ...props
}) => {
  const [value, setValue] = useState<boolean | null>(null); // Start with null (indeterminate)

  const handleClick = () => {
    let newValue: boolean | null;

    if (value === null) {
      newValue = true;
    } else if (value === true) {
      newValue = false;
    } else {
      newValue = null;
    }

    setValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <Checkbox
      {...props}
      checked={value === true}
      indeterminate={value === null}
      onClick={handleClick}
    />
  );
};

export default TernaryCheckbox;
