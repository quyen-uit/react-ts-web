import { Box, Button, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Box
      className="
        flex
        h-screen
        w-full
        items-center
        justify-center
        bg-gray-100
      "
    >
      <Container maxWidth="md">
        <div className="text-center">
          <div className="absolute top-4 right-4">
            <Button onClick={() => changeLanguage('en')}>EN</Button>
            <Button onClick={() => changeLanguage('vi')} className="ml-2">
              VI
            </Button>
          </div>
          <Typography
            variant="h1"
            className="font-extrabold text-9xl text-gray-600"
          >
            403
          </Typography>
          <Typography
            variant="h2"
            className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            {t('unauthorized.title')}
          </Typography>
          <Typography className="mt-6 text-base leading-7 text-gray-600">
            {t('unauthorized.message')}
          </Typography>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button component={Link} to="/" variant="contained">
              {t('unauthorized.go_home')}
            </Button>
          </div>
        </div>
      </Container>
    </Box>
  );
};

export default Unauthorized;
