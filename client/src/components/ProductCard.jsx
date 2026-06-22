import { motion } from 'framer-motion';
import { BadgeIndianRupee, CheckCircle2, Clock3, Heart, PackageOpen, ShoppingCart } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { useCart } from '../context/CartContext';

export const ProductCard = ({ product, index }) => {
  const { addItem, setOpen } = useCart();
  const orderMessage = `Hello, I am interested in ${product.modelNumber} of size ${product.size} priced at ₹${product.price}. Please provide more details.`;
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(orderMessage)}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl dark:bg-stone-900"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img src={product.imageUrl} alt={product.modelNumber} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
        <div className="absolute left-4 top-4 flex gap-2">
          {product.featured ? <span className="rounded-full bg-saffron-500 px-3 py-1 text-xs font-bold text-white">Featured</span> : null}
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 text-white">
          <p className="text-sm uppercase tracking-[0.3em] text-stone-300">{product.modelNumber}</p>
          <h3 className="mt-1 text-2xl font-display font-bold">{product.size}</h3>
        </div>
      </div>
      <div className="space-y-4 p-5">
        <p className="line-clamp-3 text-sm leading-6 text-stone-600 dark:text-stone-300">{product.description}</p>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl bg-stone-100 p-3 dark:bg-stone-800">
            <div className="flex items-center gap-2 font-semibold"><BadgeIndianRupee size={16} /> Price</div>
            <div className="mt-1 font-bold text-saffron-600 dark:text-saffron-300">₹{product.price.toLocaleString('en-IN')}</div>
          </div>
          <div className="rounded-2xl bg-stone-100 p-3 dark:bg-stone-800">
            <div className="flex items-center gap-2 font-semibold"><PackageOpen size={16} /> Status</div>
            <div className={`mt-1 font-bold ${product.availability === 'Available' ? 'text-emerald-600' : 'text-rose-500'}`}>{product.availability}</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-stone-500">
          <span className="inline-flex items-center gap-1 rounded-full border px-3 py-2"><Clock3 size={14} /> {product.size}</span>
          <span className="inline-flex items-center gap-1 rounded-full border px-3 py-2"><Heart size={14} /> Owner curated</span>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              addItem(product);
              setOpen(true);
            }}
            className="btn-secondary w-full justify-center"
          >
            <ShoppingCart size={18} /> Add to Cart
          </button>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-primary w-full justify-center">
            Order on WhatsApp <CheckCircle2 size={18} />
          </a>
        </div>
      </div>
    </motion.article>
  );
};
