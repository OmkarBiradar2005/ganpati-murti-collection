import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';
import heroImageUrl from '../ganapati-hero.png';

export const Hero = () => {
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
            <div className="overflow-hidden rounded-[1.6rem] border border-white/20 bg-stone-950 shadow-2xl">
              <img
                src={heroImageUrl}
                alt="Ganapati Bappa murti"
                loading="eager"
                className="h-[420px] w-full object-cover"
              />
              <div className="bg-gradient-to-r from-stone-950 to-stone-900 px-6 py-4 text-sm text-stone-200">
                Beautiful Ganapati Bappa murti collection for your festive celebration.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
