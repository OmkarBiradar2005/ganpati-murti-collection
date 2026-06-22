import { PhoneCall, MapPin, MessageCircle } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export const Footer = () => (
  <footer className="border-t border-white/10 bg-stone-950 text-stone-200">
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
      <div>
        <p className="text-xl font-display font-bold text-white">{siteConfig.name}</p>
        <p className="mt-1 text-sm text-saffron-300">Owned by {siteConfig.ownerName}</p>
      </div>
      <div className="space-y-3 text-sm text-stone-300">
        <div className="flex items-center gap-2"><PhoneCall size={16} /> {siteConfig.phonePrimary} / {siteConfig.phoneSecondary}</div>
        <div className="flex items-center gap-2"><MessageCircle size={16} /> WhatsApp: {siteConfig.phonePrimary}</div>
        <div className="flex items-center gap-2"><MapPin size={16} /> {siteConfig.address}</div>
      </div>
      <div className="text-sm text-stone-400 lg:text-right">
        <p className="font-semibold text-white">Crafted with devotion for festive celebrations</p>
        <p className="mt-2">Premium quality murtis for your Ganesh Chaturthi</p>
        <p className="mt-2">Family-run business since 2020</p>
      </div>
    </div>
  </footer>
);
