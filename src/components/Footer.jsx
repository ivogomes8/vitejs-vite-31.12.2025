import { Mail, Phone, Car } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="max-w-6xl mx-auto px-6 text-center space-y-6">

        <div className="flex justify-center text-blue-500">
          <Car size={28} />
        </div>

        <h3 className="text-xl font-semibold text-white">
          Evo Lisbon Driver
        </h3>

        <p className="text-slate-400">
          Headquartered in Lisbon, Portugal
        </p>

        {/* CONTACTS */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-6">

          {/* EMAIL */}
          <a
            href="mailto:evolisbondriver@gmail.com"
            className="flex items-center gap-2 hover:text-white transition"
          >
            <Mail size={18} />
            evolisbondriver@gmail.com
          </a>

          {/* PHONE */}
          <a
            href="tel:+351964417917"
            className="flex items-center gap-2 hover:text-white transition"
          >
            <Phone size={18} />
            +351 964 417 917
          </a>

        </div>

        <div className="mt-6 text-xs text-slate-500">
          LICENSE: RNAT 1065/2019
        </div>

        <div className="mt-10 border-t border-slate-700 pt-6 text-sm text-slate-500">
          © 2025 Evo Lisbon Driver.
        </div>
      </div>
    </footer>
  );
}


