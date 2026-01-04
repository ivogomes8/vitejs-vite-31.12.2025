import { Car, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 py-20">
      <div className="max-w-5xl mx-auto px-6 text-center">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <Car className="text-blue-500" size={36} />
        </div>

        {/* Brand */}
        <h3 className="text-2xl font-semibold text-white mb-2">
          Evo Lisbon Driver
        </h3>
        <p className="text-slate-400 mb-8">
          Headquartered in Lisbon, Portugal
        </p>

        {/* Contact */}
        <div className="flex flex-col sm:flex-row justify-center gap-8 mb-10 text-slate-300">
          <div className="flex items-center gap-3 justify-center">
            <Mail size={18} />
            <span>evolisbondriver@gmail.com</span>
          </div>

          <div className="flex items-center gap-3 justify-center">
            <Phone size={18} />
            <span>+351 964 417 917</span>
          </div>
        </div>

        {/* License */}
        <div className="inline-block bg-slate-900 border border-slate-800 rounded-full px-6 py-2 text-sm text-slate-400 mb-12">
          LICENSE: RNAT 1065/2019
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-800 max-w-xl mx-auto mb-6"></div>

        {/* Copyright */}
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} Evo Lisbon Driver.
        </p>
      </div>
    </footer>
  );
}
