import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CalendarHeart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';
import { useCountdown } from '../hooks/useCountdown';

const countdownItems = [
  { label: 'Days', key: 'days' },
  { label: 'Hours', key: 'hours' },
  { label: 'Minutes', key: 'minutes' },
  { label: 'Seconds', key: 'seconds' },
];

export const Hero = () => {
  const { days, hours, minutes, seconds } = useCountdown(siteConfig.festivalDate);

  const countdownValues = {
    days,
    hours,
    minutes,
    seconds,
  };

  return (
    <section className="relative overflow-hidden bg-festive text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,.28),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,.08),transparent_25%)]" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
            <Sparkles size={16} /> {siteConfig.ownerName} presents the festive murti collection
          </span>
          <h1 className="mt-6 max-w-3xl text-5xl font-display font-extrabold leading-tight sm:text-6xl lg:text-7xl">{siteConfig.heroTitle}</h1>
          <p className="mt-6 max-w-2xl text-lg text-stone-100/90">{siteConfig.description}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a href="#products" className="btn-primary bg-white text-stone-900 hover:text-stone-900">
              Browse Models <ArrowRight size={18} />
            </a>
            <Link to="/admin" className="btn-secondary border-white/20 bg-white/10 text-white hover:border-white/40">
              Admin Dashboard
            </Link>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="relative z-10 flex items-center justify-center">
          <div className="glass-panel w-full max-w-xl rounded-[2rem] p-4 md:p-6">
            <div className="rounded-[1.6rem] border border-white/10 bg-stone-950 p-6 text-white shadow-2xl">
              <div className="flex items-center justify-between text-sm text-stone-300">
                <span>Ganesh Chaturthi Countdown</span>
                <span className="inline-flex items-center gap-1"><CalendarHeart size={16} /> Festive season</span>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {countdownItems.map((item) => (
                  <div key={item.label} className="rounded-3xl bg-white/5 p-4 text-center">
                    <p className="text-3xl font-display font-bold">{String(countdownValues[item.key]).padStart(2, '0')}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.3em] text-stone-400">{item.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-3xl bg-gradient-to-r from-saffron-500/25 to-maroon-500/25 p-5 text-sm text-stone-100">
                Custom photos, instant updates, and clean model numbering for easy booking.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
