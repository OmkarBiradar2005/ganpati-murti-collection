import { X, MessageCircle, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { siteConfig } from '../data/siteConfig';

export const CartDrawer = () => {
  const { items, open, setOpen, removeItem, clearCart } = useCart();

  const orderMessage = items.length
    ? `Hello, I am interested in these Ganpati murtis:\n${items.map((item, index) => `${index + 1}. ${item.modelNumber} - ${item.size} - ₹${Number(item.price).toLocaleString('en-IN')}`).join('\n')}\n\nPlease provide more details.`
    : siteConfig.whatsappMessage;

  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(orderMessage)}`;

  return (
    <div className={`fixed inset-0 z-[60] ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md transform bg-white shadow-2xl transition-transform dark:bg-stone-950 ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4 dark:border-stone-800">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-saffron-600 dark:text-saffron-300">Shortlist</p>
            <h2 className="text-xl font-display font-bold">Selected Murtis</h2>
          </div>
          <button type="button" onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-stone-100 dark:hover:bg-stone-900">
            <X size={20} />
          </button>
        </div>

        <div className="flex h-[calc(100%-73px)] flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
            {items.length ? (
              items.map((item) => (
                <div key={item._id} className="flex gap-3 rounded-2xl border border-stone-200 p-3 dark:border-stone-800">
                  <img src={item.imageUrl} alt={item.modelNumber} className="h-20 w-20 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-stone-900 dark:text-stone-100">{item.modelNumber}</p>
                        <p className="text-sm text-stone-500 dark:text-stone-400">{item.size}</p>
                      </div>
                      <button type="button" onClick={() => removeItem(item._id)} className="rounded-full p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-saffron-600 dark:text-saffron-300">₹{Number(item.price).toLocaleString('en-IN')}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-center text-stone-500 dark:text-stone-400">
                <ShoppingBag size={36} />
                <p className="mt-4 text-lg font-semibold">Your shortlist is empty</p>
                <p className="mt-2 text-sm">Add murtis from the catalog to compare them before contacting the owner.</p>
              </div>
            )}
          </div>

          <div className="border-t border-stone-200 p-5 dark:border-stone-800">
            <div className="flex gap-3">
              <button type="button" onClick={clearCart} className="btn-secondary flex-1 justify-center" disabled={!items.length}>
                Clear
              </button>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-primary flex-1 justify-center">
                <MessageCircle size={18} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};
