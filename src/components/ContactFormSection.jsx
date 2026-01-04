export default function ContactFormSection() {
  return (
    <section className="bg-blue-50 text-blue-800 p-20 text-center">
      <h2 className="text-4xl font-bold mb-4">Contact / Book Now</h2>
      <p className="max-w-xl mx-auto mb-6">
        Send your travel details and we'll get back to you with a quote!
      </p>
      <form className="mt-6 space-y-4 max-w-md mx-auto">
        <input className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600" placeholder="Full Name" />
        <input className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600" placeholder="Email" />
        <input className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600" placeholder="Pickup Location" />
        <input className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600" placeholder="Destination" />
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg w-full hover:bg-blue-700 transition">
          Send Quote
        </button>
      </form>
    </section>
  );
}



