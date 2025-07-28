import { RadioGroup, FormControlLabel, Radio, Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { type ChangeEvent } from 'react';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (event: ChangeEvent<HTMLInputElement>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Box sx={{ px: 2 }}>
      <Typography variant="caption">{i18n.t('language')}</Typography>
      <RadioGroup
        row
        aria-label="language"
        name="language"
        value={i18n.language}
        onChange={handleLanguageChange}
      >
        <FormControlLabel
          value="en"
          control={<Radio />}
          label={<img src="/flags/us.svg" alt="USA Flag" width="24" />}
        />
        <FormControlLabel
          value="vi"
          control={<Radio />}
          label={<img src="/flags/vn.svg" alt="Vietnam Flag" width="24" />}
        />
      </RadioGroup>
    </Box>
  );
}
