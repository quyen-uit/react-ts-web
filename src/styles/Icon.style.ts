import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

export const ClearIconButton = styled(IconButton, {
    shouldForwardProp: (prop) => prop !== 'visible',
})<{ visible: boolean, marginRight?: number }>(({ visible, marginRight = 0 }) => ({
    marginRight: marginRight,
    marginBottom: '-4px',
    opacity: visible ? 1 : 0,
    '& .MuiSvgIcon-root': {
        fontSize: 18
    }
}));
