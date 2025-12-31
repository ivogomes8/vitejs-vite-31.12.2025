import React, { useState, useEffect } from 'react';
// Note: We are loading EmailJS via CDN to ensure compatibility with this environment.
import { 
  MapPin, 
  Calendar, 
  Users, 
  Mail, 
  Phone, 
  Car, 
  Camera, 
  ChevronRight, 
  Menu, 
  X, 
  CheckCircle, 
  Clock, 
  Navigation, 
  Sparkles, 
  MessageSquare, 
  Bot, 
  Send, 
  MessageCircle,
  Calculator,
  ShieldCheck, 
  XCircle, 
  Utensils
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState(0);

  // --- EMAILJS & GEMINI API SETUP ---
  const GEMINI_API_KEY = ""; 
  const EMAILJS_SERVICE_ID = "service_kvolp4e";
  
  // 1. YOUR EXISTING AUTO-REPLY TEMPLATE (Sent to Customer)
  const EMAILJS_CUSTOMER_TEMPLATE_ID = "template_r5cxzoo"; 
  
  // 2. YOUR ADMIN NOTIFICATION TEMPLATE (Sent to You)
  const EMAILJS_ADMIN_TEMPLATE_ID = "template_xqsjt9d"; 

  const EMAILJS_PUBLIC_KEY = "3wVdRmUPYL3RGkHh4";
  const BUSINESS_EMAIL = "evolisbondriver@gmail.com";
  const BUSINESS_PHONE = "+351 964 417 917";

  // Dynamic script loader for EmailJS
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    script.async = true;
    script.onload = () => {
      if (window.emailjs) {
        window.emailjs.init(EMAILJS_PUBLIC_KEY);
      }
    };
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // --- API HELPER WITH EXPONENTIAL BACKOFF ---
  const callGemini = async (systemPrompt, userPrompt) => {
    const delays = [1000, 2000, 4000, 8000, 16000];
    let lastError;

    for (let i = 0; i <= delays.length; i++) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: userPrompt }] }],
              systemInstruction: { parts: [{ text: systemPrompt }] }
            })
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || 'API request failed');
        }

        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text;
      } catch (error) {
        lastError = error;
        if (i < delays.length) {
          await new Promise(resolve => setTimeout(resolve, delays[i]));
        }
      }
    }
    throw lastError;
  };
  
  // --- AI FEATURE 1: ROUTE GENIUS STATE ---
  const [tripDirection, setTripDirection] = useState('from'); 
  const [otherCity, setOtherCity] = useState('Algarve');
  const [plannerInterests, setPlannerInterests] = useState('');
  const [itineraryResult, setItineraryResult] = useState('');
  const [isGeneratingItinerary, setIsGeneratingItinerary] = useState(false);

  // --- AI FEATURE 2: ASK THE DRIVER STATE ---
  const [chatQuery, setChatQuery] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [isChatting, setIsChatting] = useState(false);

  // --- MAIN FORM STATE ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pickup: '',
    dropoff: '',
    date: '',
    passengers: '2',
    stops: false,
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const baseParams = {
      "Full Name": formData.name,
      "Email": formData.email,
      "Pickup Location": formData.pickup,
      "Destination": formData.dropoff,
      "Date": formData.date,
      "Pax": formData.passengers,
      "Stops": formData.stops ? 'Yes' : 'No',
      "Message": formData.message,
      reply_to: formData.email
    };

    if (window.emailjs) {
      try {
        await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_ADMIN_TEMPLATE_ID, {
          ...baseParams,
          to_email: BUSINESS_EMAIL
        });

        await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_CUSTOMER_TEMPLATE_ID, {
          ...baseParams,
          customer_email: formData.email
        });

        setIsSubmitting(false);
        setIsSubmitted(true);
      } catch (error) {
        setIsSubmitting(false);
        console.error('EmailJS Error:', error);
        fallbackMailto();
      }
    } else {
      setIsSubmitting(false);
      fallbackMailto();
    }
  };

  const fallbackMailto = () => {
    const subject = `Transfer Request: ${formData.pickup} to ${formData.dropoff}`;
    const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0ADate: ${formData.date}%0D%0APassengers: ${formData.passengers}%0D%0ANotes: ${formData.message}`;
    window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  const generateItinerary = async () => {
    if (!plannerInterests.trim()) return;
    setIsGeneratingItinerary(true);
    setItineraryResult('');
    const currentRoute = tripDirection === 'from' ? `Lisbon to ${otherCity}` : `${otherCity} to Lisbon`;
    
    const systemPrompt = "You are an expert private driver and tour guide in Portugal and Spain. Suggest 3 specific, high-quality stopover locations along the requested route. For each stop, provide a title and a 1-sentence description of why it fits. Do not include introductory text, just the list.";
    const userPrompt = `I am traveling ${currentRoute}. I am interested in: "${plannerInterests}". Suggest stopovers.`;

    try {
      const result = await callGemini(systemPrompt, userPrompt);
      setItineraryResult(result || "I couldn't find specific stops. Try different interests!");
    } catch (error) {
      setItineraryResult(`Unable to connect to the AI service. Please try again in a few seconds.`);
    } finally {
      setIsGeneratingItinerary(false);
    }
  };

  const askDriver = async (e) => {
    e.preventDefault();
    if (!chatQuery.trim()) return;
    setIsChatting(true);
    setChatResponse('');

    const systemPrompt = "You are a friendly local Portuguese private driver. Answer questions briefly (max 2 sentences). Be helpful and polite.";
    
    try {
      const result = await callGemini(systemPrompt, chatQuery);
      setChatResponse(result || "Ask me another question!");
    } catch (error) {
      setChatResponse("I'm having trouble connecting right now. Try again shortly.");
    } finally {
      setIsChatting(false);
    }
  };

  const routes = [
    {
      id: 0,
      title: "Lisbon ↔ Porto",
      duration: "3h Direct / 6-8h with Stops",
      distance: "315km",
      description: "The most popular route in Portugal. Turn the transfer into a history lesson.",
      highlights: ["Fátima Catholic Sanctuary", "Obidos Medieval Town", "Nazaré", "Batalha Monastery", "Coimbra University", "Aveiro"]
    },
    {
      id: 1,
      title: "Lisbon ↔ Seville",
      duration: "4.5h Direct / 7-9h with Stops",
      distance: "450km",
      description: "Crossing the border into Andalusia. Experience the change in culture and landscape.",
      highlights: ["Évora", "Monsaraz Castle", "Mérida Roman Ruins"]
    },
    {
      id: 2,
      title: "Lisbon ↔ Algarve",
      duration: "3h Direct / 5-6h with Stops",
      distance: "300km",
      description: "Heading south to the beaches. Enjoy the Alentejo plains on the way.",
      highlights: ["Wine Tasting in Azeitão", "Palmela Castle", "Silves Castle"]
    }
  ];

  return (
    <div className="font-sans text-slate-800 bg-slate-50 min-h-screen w-full relative overflow-x-hidden">
      <style>{`
        * { box-sizing: border-box; }
        html, body { 
          margin: 0; 
          padding: 0; 
          width: 100%; 
          max-width: 100%;
          overflow-x: hidden; 
          scroll-behavior: smooth;
          background-color: #f8fafc;
        }
        .fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        select {
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 1rem;
        }
        /* Mobile Specific Overrides */
        @media (max-width: 640px) {
          h1 { font-size: 2rem !important; line-height: 1.2 !important; }
          .hero-text { font-size: 1rem !important; }
        }
      `}</style>
      
      <nav className="bg-white shadow-md fixed w-full z-50 top-0 left-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <button 
              onClick={() => window.scrollTo(0,0)} 
              className="flex items-center group transition-all shrink-0 bg-transparent border-none cursor-pointer p-0"
            >
              <Car className="h-8 w-8 text-blue-600 mr-2 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-900 truncate">Evo Lisbon Driver</span>
            </button>
            <div className="hidden md:flex space-x-6 lg:space-x-8 items-center text-left">
              <a href="#about" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">About</a>
              <a href="#routes" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Routes</a>
              <a href="#pricing" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Pricing</a>
              <a href="#planner" className="text-purple-600 hover:text-purple-700 font-bold flex items-center transition-colors">
                <Sparkles className="w-4 h-4 mr-1" /> AI Planner
              </a>
              <a href="#contact" className="bg-blue-600 text-white px-5 py-2.5 rounded-full hover:bg-blue-700 transition font-medium shadow-lg">
                Book Now
              </a>
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 p-2 focus:outline-none focus:ring-2 focus:ring-blue-100 rounded-lg">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 py-4 px-4 space-y-4 shadow-lg absolute w-full left-0 fade-in overflow-y-auto max-h-[calc(100vh-80px)] text-left">
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="block text-slate-600 font-medium py-3 px-2 hover:bg-slate-50 rounded">About Me</a>
            <a href="#routes" onClick={() => setIsMenuOpen(false)} className="block text-slate-600 font-medium py-3 px-2 hover:bg-slate-50 rounded">Routes</a>
            <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="block text-slate-600 font-medium py-3 px-2 hover:bg-slate-50 rounded">Pricing</a>
            <a href="#planner" onClick={() => setIsMenuOpen(false)} className="block text-purple-600 font-bold flex items-center py-3 px-2 hover:bg-purple-50 rounded"><Sparkles className="w-4 h-4 mr-2"/>AI Planner</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block text-blue-600 font-bold py-3 px-2 hover:bg-blue-50 rounded">Book Now</a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <div className="relative pt-24 pb-16 md:pt-32 lg:pt-48 lg:pb-32 w-full overflow-hidden">
        <div className="absolute inset-0 z-0 bg-slate-900">
           <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-800 opacity-90"></div>
           <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/316770/pexels-photo-316770.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center mix-blend-overlay opacity-40"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center lg:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="mb-12 lg:mb-0">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                More Than Just A <br className="hidden sm:block" />
                <span className="text-blue-400">Transfer Service.</span>
              </h1>
              <p className="hero-text text-base sm:text-lg text-slate-300 mb-8 max-w-xl mx-auto lg:mx-0">
                Experience the beauty of Portugal and Spain with a local private driver. Comfort, reliability, and custom sightseeing at your own pace.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#planner" className="px-6 py-5 sm:py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold text-lg transition shadow-lg shadow-purple-900/50 flex items-center justify-center">
                   <Sparkles className="mr-2 h-5 w-5" /> Plan Your Trip
                </a>
                <a href="#contact" className="px-6 py-5 sm:py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-lg transition shadow-lg shadow-purple-900/50 flex items-center justify-center">
                  Get a Quote <ChevronRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto lg:max-w-none">
              <div className="bg-white/10 backdrop-blur-md p-5 sm:p-6 rounded-xl border border-white/10 text-white text-left">
                <Clock className="h-7 w-7 text-blue-400 mb-3" />
                <h3 className="font-bold text-lg sm:text-xl mb-1">Your Time</h3>
                <p className="text-sm text-slate-300">We drive on your schedule, not a bus timetable.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-5 sm:p-6 rounded-xl border border-white/10 text-white text-left">
                <Camera className="h-7 w-7 text-blue-400 mb-3" />
                <h3 className="font-bold text-lg sm:text-xl mb-1">Sightseeing</h3>
                <p className="text-sm text-slate-300">Custom stops at castles, villages, and viewpoints.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-5 sm:p-6 rounded-xl border border-white/10 text-white text-left">
                <Users className="h-7 w-7 text-blue-400 mb-3" />
                <h3 className="font-bold text-lg sm:text-xl mb-1">Spacious Van</h3>
                <p className="text-sm text-slate-300">9-Seater with air conditioning, tinted windows and huge luggage capacity.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-5 sm:p-6 rounded-xl border border-white/10 text-white text-left">
                <Navigation className="h-7 w-7 text-blue-400 mb-3" />
                <h3 className="font-bold text-lg sm:text-xl mb-1">Door-to-Door</h3>
                <p className="text-sm text-slate-300">Stress-free pickup from your hotel or airport.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-white scroll-mt-24 w-full overflow-hidden text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4">Meet Your Driver</h2>
            <div className="w-16 h-1.5 bg-blue-600 mx-auto mb-10 rounded-full"></div>
            
            <div className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100 shadow-inner mb-10 text-left md:text-center">
              <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium italic mb-8">
                "Hi, I'm Evo. I've been professionally driving for over 8 years across the stunning landscapes of Portugal and Spain."
              </p>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
                Throughout these years, I've gathered the deep local knowledge necessary to provide more than just a ride. My goal is to ensure a safe, smooth, and completely stress-free transfer experience. Along the way, I love sharing my personal restaurant recommendations and sightseeing tips to ensure you make the absolute best out of your travels in my home region.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
               <div className="flex items-center px-4 py-3 rounded-xl bg-white border border-slate-200 shadow-sm transition-transform hover:-translate-y-1">
                 <MessageSquare className="w-4 h-4 mr-2 text-blue-600 shrink-0" />
                 <span className="text-slate-800 font-bold text-xs sm:text-sm whitespace-nowrap">English Fluency</span>
               </div>
               <div className="flex items-center px-4 py-3 rounded-xl bg-white border border-slate-200 shadow-sm transition-transform hover:-translate-y-1">
                 <ShieldCheck className="w-4 h-4 mr-2 text-blue-600 shrink-0" />
                 <span className="text-slate-800 font-bold text-xs sm:text-sm whitespace-nowrap">Fully Insured</span>
               </div>
               <div className="flex items-center px-4 py-3 rounded-xl bg-white border border-slate-200 shadow-sm transition-transform hover:-translate-y-1">
                 <Utensils className="w-4 h-4 mr-2 text-blue-600 shrink-0" />
                 <span className="text-slate-800 font-bold text-xs sm:text-sm whitespace-nowrap">Food & Sightseeing Tips</span>
               </div>
               <div className="flex items-center px-4 py-3 rounded-xl bg-white border border-slate-200 shadow-sm transition-transform hover:-translate-y-1">
                 <Clock className="w-4 h-4 mr-2 text-blue-600 shrink-0" />
                 <span className="text-slate-800 font-bold text-xs sm:text-sm whitespace-nowrap">Schedule Flexibility</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Routes */}
      <section id="routes" className="py-16 md:py-20 bg-white scroll-mt-24 w-full overflow-hidden text-left border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Popular Transfer Routes</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4 space-y-3 sm:space-y-4">
              {routes.map((route, idx) => (
                <button key={idx} onClick={() => setActiveRoute(idx)} className={`w-full text-left p-5 sm:p-6 rounded-xl border-2 transition active:scale-95 ${activeRoute === idx ? 'border-blue-600 bg-white shadow-xl' : 'border-transparent bg-slate-50 hover:bg-slate-100'}`}>
                  <h3 className={`font-bold text-base sm:text-lg ${activeRoute === idx ? 'text-blue-600' : 'text-slate-800'}`}>{route.title}</h3>
                  <div className="flex items-center gap-4 mt-2">
                    <p className="text-xs text-slate-500 flex items-center"><Clock size={14} className="mr-1.5"/> {route.duration}</p>
                    <p className="text-xs text-slate-500 flex items-center"><Navigation size={14} className="mr-1.5"/> {route.distance}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="lg:col-span-8 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden flex flex-col h-full text-left">
               <div className="bg-blue-600 p-6 sm:p-8 text-white">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">{routes[activeRoute].title}</h3>
                  <p className="text-sm sm:text-base opacity-90">{routes[activeRoute].description}</p>
               </div>
               <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 flex-grow">
                  {routes[activeRoute].highlights.map((h, i) => (
                    <div key={i} className="flex items-center p-4 bg-slate-50 rounded-lg text-xs sm:text-sm font-medium border border-slate-100">
                      <MapPin size={16} className="text-red-500 mr-3 shrink-0" /> {h}
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="pb-16 md:pb-20 bg-white w-full overflow-hidden scroll-mt-24 text-left border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 flex flex-col lg:flex-row items-stretch gap-8 sm:gap-12 shadow-sm">
            <div className="lg:w-1/2 flex flex-col justify-center">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold mb-4 uppercase tracking-wider w-fit">
                <Calculator className="w-3 h-3 mr-2" /> Fair & Transparent
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">How I Calculate Quotes</h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
                Every trip is unique. Instead of fixed prices that might overcharge you, I use a transparent formula based on distance and time. This ensures you only pay for your specific journey, including any custom sightseeing stops.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div className="flex items-center">
                  <div className="bg-blue-600 text-white font-bold text-xl h-14 min-w-[5.5rem] px-4 rounded-xl flex items-center justify-center mr-4 shrink-0 shadow-lg shadow-blue-200/50 transition transform hover:scale-105">€1.25</div>
                  <div>
                    <p className="font-bold text-slate-900 leading-none mb-1">Per Kilometer</p>
                    <p className="text-[11px] sm:text-xs text-slate-500">Base distance traveled</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-600 text-white font-bold text-xl h-14 min-w-[5.5rem] px-4 rounded-xl flex items-center justify-center mr-4 shrink-0 shadow-lg shadow-blue-200/50 transition transform hover:scale-105">€20</div>
                  <div>
                    <p className="font-bold text-slate-900 leading-none mb-1">Per Hour</p>
                    <p className="text-[11px] sm:text-xs text-slate-500">Driving & waiting time</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-400 italic">
                *Final quotes may vary based on specific local parking fees or extended overnight stays for multi-day tours.
              </p>
            </div>
            
            <div className="lg:w-1/2 space-y-4">
              <div className="bg-white rounded-xl p-6 sm:p-7 border border-slate-200 shadow-sm w-full">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="bg-blue-100 p-1 rounded-md"><CheckCircle className="w-4 h-4 text-blue-600" /></span> What's included?
                </h4>
                <ul className="space-y-4">
                  <li className="flex items-start text-sm text-slate-600 leading-tight">
                    <CheckCircle size={18} className="text-green-500 mr-3 shrink-0" />
                    <span>All Motorway Tolls, Fuel & Taxes</span>
                  </li>
                  <li className="flex items-start text-sm text-slate-600 leading-tight">
                    <CheckCircle size={18} className="text-green-500 mr-3 shrink-0" />
                    <span>Complementary Bottled Water & Wi-Fi</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 sm:p-7 border border-red-100 shadow-sm w-full">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="bg-red-100 p-1 rounded-md"><XCircle className="w-4 h-4 text-red-600" /></span> Not included?
                </h4>
                <ul className="space-y-4">
                  <li className="flex items-start text-sm text-slate-600 leading-tight">
                    <XCircle size={18} className="text-red-400 mr-3 shrink-0" />
                    <span>Attraction Tickets (Monuments, Castles, etc.)</span>
                  </li>
                  <li className="flex items-start text-sm text-slate-600 leading-tight">
                    <XCircle size={18} className="text-red-400 mr-3 shrink-0" />
                    <span>Individual Meal Costs</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Planner */}
      <section id="planner" className="py-16 md:py-20 bg-purple-50 border-y border-purple-100 scroll-mt-24 w-full overflow-hidden text-left">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-10">
             <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold mb-4 uppercase tracking-wider">
               <span className="flex items-center"><Sparkles className="w-3 h-3 mr-2" /> Powered by Gemini AI</span>
             </div>
             <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4">RouteGenius AI Planner</h2>
             <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base px-2">Not sure where to stop? Tell me what you love, and I'll suggest the perfect stopovers for your journey.</p>
           </div>
           
           <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-5xl mx-auto border border-purple-100">
             <div className="grid grid-cols-1 md:grid-cols-5">
               <div className="md:col-span-2 bg-slate-50 p-6 sm:p-8 space-y-5 border-b md:border-b-0 md:border-r border-slate-100">
                   <div className="bg-purple-50 p-4 sm:p-5 rounded-xl border border-purple-100">
                     <label className="block text-xs font-bold text-purple-800 mb-3 tracking-widest uppercase">Direction</label>
                     <div className="flex flex-col gap-2 mb-4">
                        <button onClick={() => setTripDirection('from')} className={`w-full p-4 sm:p-3 rounded-lg text-sm text-left border transition ${tripDirection === 'from' ? 'bg-white border-purple-300 shadow-sm text-purple-700 font-bold' : 'border-transparent text-slate-500 hover:bg-purple-100/50'}`}>Start in Lisbon</button>
                        <button onClick={() => setTripDirection('to')} className={`w-full p-4 sm:p-3 rounded-lg text-sm text-left border transition ${tripDirection === 'to' ? 'bg-white border-purple-300 shadow-sm text-purple-700 font-bold' : 'border-transparent text-slate-500 hover:bg-purple-100/50'}`}>End in Lisbon</button>
                     </div>
                     <select className="w-full p-4 sm:p-3 bg-white border border-purple-200 rounded-lg outline-none focus:ring-2 focus:ring-purple-200 min-h-[50px]" value={otherCity} onChange={(e) => setOtherCity(e.target.value)}>
                        <option value="Algarve">Algarve</option>
                        <option value="Porto">Porto</option>
                        <option value="Seville">Seville</option>
                        <option value="Salamanca">Salamanca</option>
                        <option value="Madrid">Madrid</option>
                        <option value="Málaga">Málaga</option>
                        <option value="Santiago de Compostela">Santiago de Compostela</option>
                     </select>
                   </div>
                   <div className="px-1">
                     <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest text-left">Your Interests</label>
                     <textarea className="w-full p-4 border border-slate-200 rounded-lg h-32 text-sm outline-none focus:ring-2 focus:ring-purple-200 transition resize-none" placeholder="I love history, wine, and small villages..." value={plannerInterests} onChange={(e) => setPlannerInterests(e.target.value)}></textarea>
                   </div>
                   <button onClick={generateItinerary} disabled={isGeneratingItinerary} className={`w-full bg-purple-600 text-white font-bold py-5 sm:py-4 rounded-lg transition active:scale-95 ${isGeneratingItinerary ? 'opacity-50' : 'hover:bg-purple-700 shadow-lg'}`}>
                     {isGeneratingItinerary ? "Planning..." : "Get Suggestions"}
                   </button>
               </div>
               <div className="md:col-span-3 p-6 sm:p-10 bg-white min-h-[300px] flex flex-col justify-center text-left">
                 {itineraryResult ? (
                   <div className="whitespace-pre-line text-slate-600 leading-relaxed fade-in text-sm sm:text-base">{itineraryResult}</div>
                 ) : (
                   <div className="text-center text-slate-400 italic py-12">
                     <MapPin className="mx-auto mb-3 opacity-30 h-10 w-10" />
                     Your custom route highlights will appear here.
                   </div>
                 )}
               </div>
             </div>
           </div>
         </div>
      </section>

      {/* Ask Driver AI Helper */}
      <section id="ask-driver" className="py-12 bg-white border-t w-full overflow-hidden scroll-mt-24 text-left">
        <div className="max-w-3xl mx-auto px-4">
           <div className="bg-slate-900 rounded-2xl p-6 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center gap-8 sm:gap-8">
             <Bot className="w-14 h-14 text-blue-400 shrink-0" />
             <div className="grow w-full">
                <h3 className="text-white text-lg font-bold mb-2 text-center md:text-left">Ask the Driver</h3>
                <p className="text-slate-500 text-xs mb-4 text-center md:text-left px-4 md:px-0">Quick questions about travel, culture, or local tips.</p>
                <form onSubmit={askDriver} className="relative">
                  <input type="text" placeholder="e.g. Do I need to tip in Portugal?" className="w-full p-5 pr-16 rounded-xl bg-slate-800 text-white border-none outline-none focus:ring-2 focus:ring-blue-500 transition text-sm sm:text-base" value={chatQuery} onChange={(e) => setChatQuery(e.target.value)} />
                  <button type="submit" disabled={isChatting} className="absolute right-2 top-2 p-2 bg-blue-600 text-white rounded-lg transition hover:bg-blue-500 active:scale-95 disabled:opacity-50 h-12 w-12 flex items-center justify-center">
                    {isChatting ? <span className="animate-pulse">...</span> : <Send size={24} />}
                  </button>
                </form>
                {chatResponse && <div className="mt-4 p-5 bg-slate-800 rounded-xl text-blue-100 text-sm sm:text-base border-l-4 border-blue-500 fade-in text-left"><span className="font-bold text-blue-400">Driver:</span> {chatResponse}</div>}
             </div>
           </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-16 md:py-20 bg-slate-50 scroll-mt-24 w-full overflow-hidden border-t border-slate-100 text-left">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 min-h-[500px] flex flex-col">
            <div className="bg-blue-600 p-10 sm:p-12 text-center text-white shrink-0">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Request a Quote</h2>
              <p className="mb-8 opacity-90 text-sm sm:text-base max-w-lg mx-auto leading-relaxed px-2">Ready for a custom quote? Send your travel details below and I'll get back to you shortly.</p>
              <a href="https://wa.me/351964417917" target="_blank" rel="noreferrer" className="inline-flex items-center bg-[#25D366] px-8 py-5 rounded-full font-bold shadow-xl hover:bg-[#1ebe57] transition active:scale-95 transform">
                <MessageCircle className="mr-3 h-7 w-7" /> WhatsApp Me Directly
              </a>
            </div>
            
            <div className="p-6 sm:p-12 flex-grow flex items-center justify-center">
              {isSubmitted ? (
                <div className="text-center space-y-4 fade-in py-10">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Thank You!</h3>
                  <p className="text-slate-600 max-w-sm mx-auto">Your request has been sent successfully. I will review your details and get back to you with a quote very soon.</p>
                  <button onClick={() => setIsSubmitted(false)} className="text-blue-600 font-bold hover:underline">Send another request</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="w-full space-y-6 sm:space-y-8 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    <div className="space-y-2 text-left">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" className="w-full p-5 sm:p-4 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition text-sm sm:text-base min-h-[55px]" required />
                    </div>
                    <div className="space-y-2 text-left">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="your@email.com" className="w-full p-5 sm:p-4 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition text-sm sm:text-base min-h-[55px]" required />
                    </div>
                    <div className="space-y-2 text-left">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Pickup Location</label>
                      <input type="text" name="pickup" value={formData.pickup} onChange={handleInputChange} placeholder="Hotel/Airport name" className="w-full p-5 sm:p-4 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition text-sm sm:text-base min-h-[55px]" required />
                    </div>
                    <div className="space-y-2 text-left">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Destination</label>
                      <input type="text" name="dropoff" value={formData.dropoff} onChange={handleInputChange} placeholder="City or address" className="w-full p-5 sm:p-4 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition text-sm sm:text-base min-h-[55px]" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-left">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Date of Travel</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                        <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full pl-12 pr-4 py-5 sm:py-4 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition text-sm sm:text-base min-h-[55px]" required />
                      </div>
                    </div>
                    <div className="space-y-2 text-left">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Number of Passengers</label>
                      <div className="relative">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                        <select name="passengers" value={formData.passengers} onChange={handleInputChange} className="w-full pl-12 pr-10 py-5 sm:py-4 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition bg-white text-sm sm:text-base appearance-none cursor-pointer min-h-[55px]">
                          <option value="1">1 Person</option>
                          <option value="2">2 People</option>
                          <option value="3">3 People</option>
                          <option value="4">4 People</option>
                          <option value="5">5 People</option>
                          <option value="6">6 People</option>
                          <option value="7">7 People</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start p-5 bg-blue-50 rounded-xl border border-blue-100 transition-colors hover:bg-blue-100/50 cursor-pointer text-left">
                    <div className="flex items-center h-6">
                      <input type="checkbox" id="stops-cb" name="stops" checked={formData.stops} onChange={handleInputChange} className="h-6 w-6 text-blue-600 rounded cursor-pointer transition focus:ring-blue-500" />
                    </div>
                    <label htmlFor="stops-cb" className="ml-4 text-sm sm:text-base text-slate-700 cursor-pointer select-none leading-normal">
                      Interested in sightseeing stops along the way? I'll incorporate them into your personalized quote.
                    </label>
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Additional Details / Questions</label>
                    <textarea name="message" value={formData.message} onChange={handleInputChange} rows="4" placeholder="e.g. Traveling with several large suitcases, child seat needed, or specific sightseeing requests..." className="w-full p-5 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition resize-none text-sm sm:text-base"></textarea>
                  </div>

                  <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white font-bold py-6 rounded-2xl shadow-xl hover:bg-blue-700 transition active:scale-[0.98] transform flex items-center justify-center text-lg sm:text-xl disabled:opacity-70">
                    {isSubmitting ? (
                      <>
                        <div className="mr-3 w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending Quote Request...
                      </>
                    ) : (
                      <>Send Quote Request <ChevronRight className="ml-2 h-6 w-6" /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-500 py-16 text-center text-sm w-full overflow-hidden border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center mb-6">
            <Car size={32} className="text-blue-600 opacity-80" />
          </div>
          <div className="mb-6 text-center px-4">
            <p className="font-bold text-slate-400 mb-1 text-lg">Evo Lisbon Driver</p>
            <p className="text-slate-600 mb-6">Headquartered in Lisbon, Portugal</p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10 mb-8">
              <a href={`mailto:${BUSINESS_EMAIL}`} className="flex items-center gap-3 hover:text-blue-400 transition-colors py-2 px-1">
                <Mail size={18} /> {BUSINESS_EMAIL}
              </a>
              <a href={`tel:+351964417917`} className="flex items-center gap-3 hover:text-blue-400 transition-colors py-2 px-1">
                <Phone size={18} /> +351 964 417 917
              </a>
            </div>
            
            <p className="text-xs uppercase tracking-widest text-slate-700 font-bold mb-4 bg-slate-800/20 py-2 px-4 rounded-full inline-block">License: RNAT 1065/2019</p>
          </div>
          <div className="w-full h-px bg-slate-800 max-w-xs mx-auto mb-8"></div>
          <p className="max-w-md mx-auto leading-relaxed text-center text-slate-600">
            &copy; 2025 Evo Lisbon Driver.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;