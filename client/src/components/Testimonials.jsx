import { SectionHeader } from './SectionHeader';

const testimonials = [
  {
    name: 'Amit Patil',
    quote: 'The model numbering made selection very easy and the photos matched the actual murti beautifully.',
  },
  {
    name: 'Neha Deshmukh',
    quote: 'Quick WhatsApp response and clear size/price details saved us a lot of time.',
  },
  {
    name: 'Rohit Jadhav',
    quote: 'The festive presentation felt premium and the featured models helped us shortlist fast.',
  },
];

export const Testimonials = () => (
  <section className="space-y-8">
    <SectionHeader
      eyebrow="Customer Stories"
      title="Trusted by festive buyers"
      description="A simple model-first catalog with direct contact makes the buying process faster for families and mandals."
      align="center"
    />
    <div className="grid gap-6 md:grid-cols-3">
      {testimonials.map((item) => (
        <blockquote key={item.name} className="glass-panel rounded-[2rem] p-6">
          <p className="text-sm leading-7 text-stone-600 dark:text-stone-300">“{item.quote}”</p>
          <footer className="mt-4 text-sm font-semibold text-stone-900 dark:text-white">{item.name}</footer>
        </blockquote>
      ))}
    </div>
  </section>
);
