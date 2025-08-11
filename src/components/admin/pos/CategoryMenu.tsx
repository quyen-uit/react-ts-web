import { Box, Button, Typography } from '@mui/material';

import type { Category } from '@/types/admin/pos';

interface CategoryMenuProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryMenu = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryMenuProps) => {
  return (
    <Box sx={{ width: '100px', p: 2, bgcolor: 'background.paper' }}>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.name ? 'contained' : 'text'}
          onClick={() => onSelectCategory(category.name)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            mb: 2,
            width: '100%',
            height: '80px',
          }}
        >
          <Typography variant="h4">{category.icon}</Typography>
          <Typography variant="caption">{category.name}</Typography>
        </Button>
      ))}
    </Box>
  );
};

export default CategoryMenu;
