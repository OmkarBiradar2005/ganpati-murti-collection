import { SectionHeader } from './SectionHeader';

export const Gallery = ({ products }) => (
  <section id="gallery" className="space-y-8">
    <SectionHeader
      eyebrow="Image Gallery"
      title="Real photos from the collection"
      description="Lazy-loaded photos help customers compare finishes, posture, and colors quickly."
      align="center"
    />
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {products.slice(0, 4).map((product) => (
        <figure key={product._id || product.modelNumber} className="group overflow-hidden rounded-[1.8rem] border border-white/10 bg-white shadow-lg dark:bg-stone-900">
          <img src={product.imageUrl} alt={product.modelNumber} className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
          <figcaption className="p-4">
            <p className="text-sm font-bold text-saffron-600 dark:text-saffron-300">{product.modelNumber}</p>
            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">{product.size}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  </section>
);
