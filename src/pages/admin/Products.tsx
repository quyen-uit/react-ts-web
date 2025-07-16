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
import { useTranslation } from 'react-i18next';
import {
  useGetProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} from '@/app/features/products/productSlice';
import { useState } from 'react';

const Products = () => {
  const { t } = useTranslation();
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useGetProductsQuery();
  const [addProduct] = useAddProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [newProduct, setNewProduct] = useState({ name: '', price: '' });

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    await addProduct(newProduct);
    setNewProduct({ name: '', price: '' });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t('product.title')}</h1>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">{t('product.form.title')}</h2>
        <form onSubmit={handleAddProduct}>
          <TextField
            label={t('product.form.name')}
            variant="outlined"
            className="mb-2"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <TextField
            label={t('product.form.price')}
            variant="outlined"
            className="mb-2 ml-2"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
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
            {products?.map((product: any) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary">
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    className="ml-2"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Products;
