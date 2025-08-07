import { useState } from 'react';

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
  Box,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import { useProducts } from '@/hooks/shared/useProducts';
import {
  useAddProductMutation,
  useDeleteProductMutation,
} from '@/store/slices/products/productApiSlice';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

const Products = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const { products, isLoading, error, refetch } = useProducts({ searchTerm });
  const [addProduct] = useAddProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    category: '',
  });

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addProduct(newProduct).unwrap();
      setNewProduct({ name: '', price: 0, category: '' });
      refetch();
    } catch (err) {
      console.error('Failed to add product:', err);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id).unwrap();
      refetch();
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  if (isLoading) {
    return <div>{t('product.loading')}</div>;
  }

  if (error) {
    return (
      <div>
        {t('product.error')} {JSON.stringify(error)}
      </div>
    );
  }

  return (
    <Box>
      <Typography variant="h4" className="text-2xl font-bold mb-4">
        {t('product.title')}
      </Typography>
      <Box className="mb-4">
        <Typography variant="h5" className="text-xl font-bold mb-2">
          {t('product.form.title')}
        </Typography>
        <form onSubmit={handleAddProduct}>
          <TextField
            label={t('product.form.name')}
            variant="outlined"
            className="mb-2 mr-2"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <TextField
            label={t('product.form.price')}
            variant="outlined"
            type="number"
            className="mb-2 mr-2"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: Number(e.target.value) })
            }
          />
          <TextField
            label={t('product.form.category')}
            variant="outlined"
            className="mb-2 mr-2"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
          />
          <Button type="submit" variant="contained" color="primary">
            {t('product.form.add')}
          </Button>
        </form>
      </Box>
      <TextField
        label={t('product.search')}
        variant="outlined"
        className="mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('product.table.name')}</TableCell>
              <TableCell>{t('product.table.price')}</TableCell>
              <TableCell>{t('product.form.category')}</TableCell>
              <TableCell>{t('product.table.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product: Product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    {t('product.table.delete')}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Products;
