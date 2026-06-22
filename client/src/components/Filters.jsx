import { Search } from 'lucide-react';

export const Filters = ({ filters, setFilters }) => (
  <div className="glass-panel rounded-[2rem] p-5">
    <div className="grid gap-4 md:grid-cols-5">
      <label className="space-y-2 md:col-span-2">
        <span className="text-sm font-semibold">Search Model Number</span>
        <div className="flex items-center gap-2 rounded-2xl border border-stone-200 bg-white px-4 py-3 dark:border-stone-800 dark:bg-stone-950">
          <Search size={18} className="text-stone-400" />
          <input
            value={filters.modelNumber}
            onChange={(event) => setFilters((current) => ({ ...current, modelNumber: event.target.value }))}
            placeholder="Model 1, Model 2..."
            className="w-full bg-transparent outline-none"
          />
        </div>
      </label>
      <label className="space-y-2">
        <span className="text-sm font-semibold">Size</span>
        <input
          value={filters.size}
          onChange={(event) => setFilters((current) => ({ ...current, size: event.target.value }))}
          placeholder="12 inch"
          className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none dark:border-stone-800 dark:bg-stone-950"
        />
      </label>
      <label className="space-y-2">
        <span className="text-sm font-semibold">Min Price</span>
        <input
          type="number"
          value={filters.minPrice}
          onChange={(event) => setFilters((current) => ({ ...current, minPrice: event.target.value }))}
          placeholder="0"
          className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none dark:border-stone-800 dark:bg-stone-950"
        />
      </label>
      <label className="space-y-2">
        <span className="text-sm font-semibold">Availability</span>
        <select
          value={filters.availability}
          onChange={(event) => setFilters((current) => ({ ...current, availability: event.target.value }))}
          className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none dark:border-stone-800 dark:bg-stone-950"
        >
          <option value="">All</option>
          <option value="Available">Available</option>
          <option value="Sold Out">Sold Out</option>
        </select>
      </label>
    </div>
  </div>
);
