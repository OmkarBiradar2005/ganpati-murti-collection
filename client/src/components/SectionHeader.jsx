export const SectionHeader = ({ eyebrow, title, description, align = 'left' }) => (
  <div className={`${align === 'center' ? 'text-center mx-auto' : ''} max-w-3xl mb-8`}>
    {eyebrow ? <p className="text-sm font-bold uppercase tracking-[0.35em] text-saffron-600 dark:text-saffron-300">{eyebrow}</p> : null}
    <h2 className="section-title mt-3">{title}</h2>
    {description ? <p className="section-subtitle mt-4">{description}</p> : null}
  </div>
);
