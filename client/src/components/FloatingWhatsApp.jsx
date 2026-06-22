import { MessageCircle } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export const FloatingWhatsApp = ({ message }) => {
  const url = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message || siteConfig.whatsappMessage)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25d366] px-4 py-3 text-white shadow-2xl transition hover:scale-105"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={18} />
      <span className="hidden sm:inline font-semibold">WhatsApp</span>
    </a>
  );
};
