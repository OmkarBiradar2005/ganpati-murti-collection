import { useMemo, useState } from 'react';
import { Hero } from '../components/Hero';
import { SectionHeader } from '../components/SectionHeader';
import { CountdownBanner } from '../components/CountdownBanner';
import { Filters } from '../components/Filters';
import { ProductGrid } from '../components/ProductGrid';
import { ContactSection } from '../components/ContactSection';
import { Loader } from '../components/Loader';
import { useProducts } from '../hooks/useProducts';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';
import { Footer } from '../components/Footer';
import { siteConfig } from '../data/siteConfig';

const initialFilters = { modelNumber: '', size: '', minPrice: '', availability: '' };

const Home = () => {
  const { products, loading, error } = useProducts({}, 20000);
  const [filters, setFilters] = useState(initialFilters);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesModel = product.modelNumber.toLowerCase().includes(filters.modelNumber.toLowerCase());
      const matchesSize = product.size.toLowerCase().includes(filters.size.toLowerCase());
      const matchesMin = filters.minPrice ? Number(product.price) >= Number(filters.minPrice) : true;
      const matchesAvailability = filters.availability ? product.availability === filters.availability : true;
      return matchesModel && matchesSize && matchesMin && matchesAvailability;
    });
  }, [products, filters]);

  const featuredProducts = filteredProducts.filter((product) => product.featured);

  return (
    <div className="min-h-screen">
      <Hero />

      <main className="mx-auto flex max-w-7xl flex-col gap-20 px-4 py-14 sm:px-6 lg:px-8">
        <CountdownBanner />

        <section id="products" className="space-y-8">
          <Filters filters={filters} setFilters={setFilters} />
          {loading ? <Loader /> : null}
          {error ? <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-200">{error}</p> : null}
          <ProductGrid products={filteredProducts} />
          {!filteredProducts.length && !loading ? <div className="rounded-[2rem] border border-dashed border-stone-300 p-10 text-center text-stone-500 dark:border-stone-700">No products match the current filters.</div> : null}
        </section>

        <section id="featured" className="space-y-8">
          <ProductGrid products={featuredProducts.length ? featuredProducts : filteredProducts.slice(0, 3)} />
        </section>

        <ContactSection />
      </main>

      <FloatingWhatsApp message={`Hello, I would like to know more about ${siteConfig.name}.`} />
      <Footer />
    </div>
  );
};

export default Home;
