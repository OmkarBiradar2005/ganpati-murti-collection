import { ProductCard } from './ProductCard';

export const ProductGrid = ({ products }) => (
  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
    {products.map((product, index) => (
      <ProductCard key={product._id || product.modelNumber} product={product} index={index} />
    ))}
  </div>
);
