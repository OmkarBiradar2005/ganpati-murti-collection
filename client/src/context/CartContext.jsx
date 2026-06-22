import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext(null);
const STORAGE_KEY = 'sgmc-cart-items';

const readStoredCart = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => readStoredCart());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product) => {
    setItems((current) => {
      const existing = current.find((item) => item._id === product._id);
      if (existing) {
        toast.success(`${product.modelNumber} is already in your shortlist`);
        return current;
      }

      toast.success(`${product.modelNumber} added to shortlist`);
      return [
        ...current,
        {
          _id: product._id,
          modelNumber: product.modelNumber,
          size: product.size,
          price: product.price,
          imageUrl: product.imageUrl,
          availability: product.availability,
        },
      ];
    });
  };

  const removeItem = (id) => {
    setItems((current) => current.filter((item) => item._id !== id));
    toast.success('Removed from shortlist');
  };

  const clearCart = () => {
    setItems([]);
    toast.success('Shortlist cleared');
  };

  const value = useMemo(
    () => ({
      items,
      open,
      setOpen,
      addItem,
      removeItem,
      clearCart,
      itemCount: items.length,
    }),
    [items, open]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
