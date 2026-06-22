import { useEffect, useState } from 'react';
import api from '../api';
import { mockProducts } from '../data/mockProducts';

export const useProducts = (params = {}, pollMs = 0) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/products', { params });
      setProducts(response.data.length ? response.data : mockProducts);
      setError('');
    } catch (err) {
      setProducts(mockProducts);
      setError(err.response?.data?.message || 'Using offline sample catalog until the API is connected.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [JSON.stringify(params)]);

  useEffect(() => {
    if (!pollMs) {
      return undefined;
    }

    const interval = setInterval(fetchProducts, pollMs);
    return () => clearInterval(interval);
  }, [pollMs, JSON.stringify(params)]);

  return { products, loading, error, refetch: fetchProducts, setProducts };
};
