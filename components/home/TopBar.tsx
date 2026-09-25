import React from 'react';
import { Phone, Mail, Instagram, MapPin } from 'lucide-react';
import WhatsAppIcon from '../icons/WhatsAppIcon';

export default function TopBar() {
  return (
    <div className="bg-[#11120f] text-neutral-300 text-xs py-1.5 sm:py-2 px-3 sm:px-4 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5 sm:gap-2">
        {/* Left Side: Status & Contact */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-5">
          <span className="inline-flex items-center gap-2 text-neutral-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#bbff1bff] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#bbff1bff]" />
            </span>
            <strong className="text-white font-semibold">24/7 Stall Fabrication & Support Active</strong>
          </span>
          <span className="hidden sm:inline-block text-neutral-600">|</span>
          <a
            href="tel:+919876543210"
            className="hover:text-[#bbff1bff] transition-colors flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-[#bbff1bff]" /> +91 (0) 98765 43210
          </a>
          <a
            href="mailto:hello@ssgroup.com"
            className="hover:text-[#bbff1bff] transition-colors hidden md:flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5 text-[#bbff1bff]" /> ifo@ssgroupexhibition.com
          </a>
        </div>

        {/* Right Side: Location & Social */}
        <div className="flex items-center gap-4">
          <span className="text-neutral-400 hidden lg:inline-flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#bbff1bff]" /> HQ: Delhi, India
          </span>
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-pink-400 transition-colors flex items-center"
              aria-label="Instagram"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5 font-medium"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366]" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
