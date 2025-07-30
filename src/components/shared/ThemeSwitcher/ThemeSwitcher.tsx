import { useColorScheme } from '@mui/material/styles';
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Typography,
} from '@mui/material';
import { WbSunny, NightsStay } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { type ChangeEvent } from 'react';

export default function ThemeSwitcher() {
  const { mode, setMode } = useColorScheme();
  const { t } = useTranslation();

  const handleThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMode(event.target.value === 'dark' ? 'dark' : 'light');
  };

  return (
    <Box sx={{ px: 2 }}>
      <Typography variant="caption">{t('toggle_theme')}</Typography>
      <RadioGroup
        row
        aria-label="theme"
        name="theme"
        value={mode}
        onChange={handleThemeChange}
      >
        <FormControlLabel
          value="light"
          control={<Radio />}
          label={<WbSunny />}
        />
        <FormControlLabel
          value="dark"
          control={<Radio />}
          label={<NightsStay />}
        />
      </RadioGroup>
    </Box>
  );
}
