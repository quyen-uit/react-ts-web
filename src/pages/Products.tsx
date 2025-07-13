import { useTranslation } from 'react-i18next';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from '@mui/material';

const Products = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t('product.title')}</h1>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">{t('product.form.title')}</h2>
        <form>
          <TextField
            label={t('product.form.name')}
            variant="outlined"
            className="mb-2"
          />
          <TextField
            label={t('product.form.price')}
            variant="outlined"
            className="mb-2 ml-2"
          />
          <Button variant="contained" color="primary" type="submit">
            {t('product.form.submit')}
          </Button>
        </form>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('product.table.name')}</TableCell>
              <TableCell>{t('product.table.price')}</TableCell>
              <TableCell>{t('product.table.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Product 1</TableCell>
              <TableCell>$100</TableCell>
              <TableCell>
                <Button variant="contained" color="primary">
                  Edit
                </Button>
                <Button variant="contained" color="secondary" className="ml-2">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Products;
