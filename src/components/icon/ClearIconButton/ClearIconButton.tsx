import React from 'react';
import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
interface ClearIconButtonProps {
  onClick: () => void;
  visible: boolean;
  marginRight?: number;
}

const ClearIconButton: React.FC<ClearIconButtonProps> = ({
  onClick,
  visible,
  marginRight = 0,
}) => {
  return (
    <IconButton
      hidden={!visible}
      onClick={onClick}
      size="small"
      sx={{
        marginRight: marginRight,
        opacity: visible ? 1 : 0,
        '& .MuiSvgIcon-root': {
          fontSize: 20,
        },
      }}
    >
      <Close />
    </IconButton>
  );
};

export default ClearIconButton;
