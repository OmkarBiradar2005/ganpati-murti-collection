export const Loader = ({ label = 'Loading catalog...' }) => (
  <div className="flex items-center justify-center py-16 text-stone-500 dark:text-stone-400">
    <div className="inline-flex items-center gap-3 rounded-full border border-stone-200 bg-white px-5 py-3 shadow-sm dark:border-stone-800 dark:bg-stone-900">
      <span className="h-3 w-3 animate-pulse rounded-full bg-saffron-500" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  </div>
);
