import React from 'react';

interface ProductCardProps {
  name: string;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>${price}</p>
    </div>
  );
};

export default ProductCard;
