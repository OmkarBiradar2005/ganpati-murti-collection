import { MapPin, Phone, MessageCircle } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { SectionHeader } from './SectionHeader';

export const ContactSection = () => (
  <section id="contact" className="space-y-8">
    <SectionHeader
      eyebrow="Contact"
      title="Reach the owner directly"
      description="Customers do not pay online. They browse the catalog and contact the owner through phone or WhatsApp."
      align="center"
    />
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="glass-panel rounded-[2rem] p-6 space-y-5">
        <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noreferrer" className="btn-primary w-full justify-center"><MessageCircle size={18} /> WhatsApp</a>
        <a href={`tel:${siteConfig.phonePrimary}`} className="btn-secondary w-full justify-center"><Phone size={18} /> Call {siteConfig.ownerName}</a>
        <a href={`tel:${siteConfig.phoneSecondary}`} className="btn-secondary w-full justify-center"><Phone size={18} /> Alternate: {siteConfig.phoneSecondary}</a>
        <a href={siteConfig.mapsUrl} target="_blank" rel="noreferrer" className="btn-secondary w-full justify-center"><MapPin size={18} /> Open Google Maps</a>
      </div>
      <div className="glass-panel rounded-[2rem] p-6">
        <div className="rounded-[1.5rem] bg-stone-950 p-6 text-white">
          <p className="text-sm uppercase tracking-[0.3em] text-stone-400">Shop Address</p>
          <p className="mt-3 text-xl font-display font-bold">{siteConfig.address}</p>
        </div>
      </div>
    </div>
  </section>
);
