import { MessageCircle } from "lucide-react";

export default function ContactFormSection() {
  return (
    <section id="contact" className="bg-white">

      {/* TOP CTA */}
      <div className="bg-blue-600 text-white py-24 px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Request a Quote
        </h2>

        <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10">
          Ready for a custom quote? Send your travel details below and I'll get
          back to you shortly.
        </p>

        <a
          href="https://wa.me/351964417917"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold px-10 py-4 rounded-full text-lg shadow-lg transition"
        >
          <MessageCircle size={24} />
          WhatsApp Me Directly
        </a>
      </div>

      {/* FORM */}
      <div className="py-24 px-6">
        <div className="max-w-3xl mx-auto">

          <form className="grid gap-6 md:grid-cols-2 bg-slate-50 p-10 rounded-3xl shadow-sm">

            <input
              type="text"
              placeholder="Full Name"
              className="border border-slate-200 rounded-lg px-4 py-3 w-full"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="border border-slate-200 rounded-lg px-4 py-3 w-full"
            />

            <input
              type="text"
              placeholder="Pickup Location"
              className="border border-slate-200 rounded-lg px-4 py-3 w-full"
            />

            <input
              type="text"
              placeholder="Destination"
              className="border border-slate-200 rounded-lg px-4 py-3 w-full"
            />

            <input
              type="date"
              className="border border-slate-200 rounded-lg px-4 py-3 w-full"
            />

            <select className="border border-slate-200 rounded-lg px-4 py-3 w-full">
              <option>Number of Passengers</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4+</option>
            </select>

            <textarea
              placeholder="Additional details or special requests"
              rows="4"
              className="border border-slate-200 rounded-lg px-4 py-3 w-full md:col-span-2"
            ></textarea>

            <button
              type="submit"
              className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition"
            >
              Send Quote Request
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}




