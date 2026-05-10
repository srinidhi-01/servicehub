import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search, MapPin, Calendar, ChevronRight, Star,
  Shield, Clock, ThumbsUp, ArrowRight, Zap, CheckCircle
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const SERVICES = [
  { name: 'AC Repair', icon: '❄️', price: 'From ₹499', desc: 'Expert AC service & repair' },
  { name: 'Plumbing', icon: '🔧', price: 'From ₹299', desc: 'Fix leaks, pipes & fittings' },
  { name: 'Cleaning', icon: '🧹', price: 'From ₹799', desc: 'Deep home & office clean' },
  { name: 'Electrician', icon: '⚡', price: 'From ₹349', desc: 'Wiring, fittings & repairs' },
  { name: 'Painting', icon: '🎨', price: 'From ₹8/sqft', desc: 'Interior & exterior painting' },
  { name: 'Appliance Repair', icon: '🔌', price: 'From ₹399', desc: 'All home appliances fixed' },
]

const STATS = [
  { value: '50+', label: 'Cities Served' },
  { value: '2M+', label: 'Happy Customers' },
  { value: '10K+', label: 'Verified Experts' },
  { value: '4.8★', label: 'Average Rating' },
]

const WHY_US = [
  { icon: <Shield size={28} />, title: 'Verified Professionals', desc: 'Background-checked & certified experts for your safety.' },
  { icon: <Clock size={28} />, title: 'On-Time Service', desc: 'We respect your time. Professionals arrive on schedule.' },
  { icon: <ThumbsUp size={28} />, title: 'Satisfaction Guaranteed', desc: 'Not happy? We\'ll re-do or refund — no questions asked.' },
  { icon: <Zap size={28} />, title: 'Instant Booking', desc: 'Book in under 60 seconds from anywhere, anytime.' },
]

const TESTIMONIALS = [
  { name: 'Priya Sharma', city: 'Bengaluru', rating: 5, text: 'Excellent AC service! The technician was punctual and professional. Highly recommended.' },
  { name: 'Rahul Mehta', city: 'Mumbai', rating: 5, text: 'BookedPlumbing service in 2 minutes. Guy came on time and fixed everything perfectly.' },
  { name: 'Anjali Rao', city: 'Hyderabad', rating: 5, text: 'The house cleaning was thorough and the team was very polite. Will book again!' },
]

export default function LandingPage() {
  const navigate = useNavigate()
  const [selectedService, setSelectedService] = useState('AC Repair')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')

  const handleBook = () => {
    const phone = localStorage.getItem('customer_phone')
    if (!phone) {
      navigate('/login')
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-white font-body">
      <Navbar transparent />

      {/* HERO SECTION */}
      <section className="hero-gradient relative overflow-hidden pt-16">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-32 relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-medium px-4 py-2 rounded-full mb-6">
              <Zap size={12} className="text-brand-gold" /> India's #1 Home Services Platform
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-white leading-tight mb-4">
              Expert Home Services,
              <br />
              <span className="text-brand-gold">Just a Tap Away</span>
            </h1>
            <p className="text-white/75 text-lg max-w-xl mx-auto">
              Book trusted professionals for AC repair, plumbing, cleaning & more. Delivered right to your door.
            </p>
          </div>

          {/* BOOKING WIDGET */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-hero p-2 flex flex-col md:flex-row gap-2">
              {/* Service selector */}
              <div className="flex-1 p-3 border border-gray-100 rounded-xl hover:border-brand-blue/40 transition-colors">
                <label className="label text-brand-blue">Service</label>
                <select
                  value={selectedService}
                  onChange={e => setSelectedService(e.target.value)}
                  className="w-full text-gray-900 font-semibold text-sm bg-transparent outline-none cursor-pointer"
                >
                  {SERVICES.map(s => (
                    <option key={s.name} value={s.name}>{s.icon} {s.name}</option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div className="flex-1 p-3 border border-gray-100 rounded-xl hover:border-brand-blue/40 transition-colors">
                <label className="label text-brand-blue">Location</label>
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter your city or area"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="w-full text-sm text-gray-900 placeholder-gray-400 bg-transparent outline-none font-medium"
                  />
                </div>
              </div>

              {/* Date */}
              <div className="flex-1 p-3 border border-gray-100 rounded-xl hover:border-brand-blue/40 transition-colors">
                <label className="label text-brand-blue">Date</label>
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-gray-400" />
                  <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full text-sm text-gray-900 bg-transparent outline-none font-medium"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={handleBook}
                className="md:w-auto w-full bg-brand-orange hover:bg-brand-lightorange text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95 whitespace-nowrap"
              >
                <Search size={17} /> Search Services
              </button>
            </div>

            {/* Quick links below widget */}
            <div className="flex flex-wrap gap-3 mt-4 justify-center">
              {['Trending:', 'AC Gas Refill', 'Bathroom Deep Clean', 'Fan Installation', 'Pest Control'].map((tag, i) => (
                <span
                  key={tag}
                  className={`text-xs px-3 py-1.5 rounded-full cursor-pointer transition-colors ${
                    i === 0
                      ? 'text-white/60 font-medium'
                      : 'bg-white/15 text-white hover:bg-white/25 border border-white/20'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map(s => (
            <div key={s.label} className="text-center py-4">
              <div className="font-display font-extrabold text-3xl text-brand-deepblue">{s.value}</div>
              <div className="text-sm text-gray-500 font-medium mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICE CATEGORIES */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-brand-orange font-semibold text-sm uppercase tracking-wider mb-2">Our Services</p>
            <h2 className="font-display font-bold text-3xl text-gray-900">What Are You Looking For?</h2>
          </div>
          <button onClick={handleBook} className="hidden sm:flex items-center gap-2 text-brand-blue font-semibold text-sm hover:gap-3 transition-all">
            View all services <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {SERVICES.map(service => (
            <div
              key={service.name}
              onClick={handleBook}
              className="category-card card p-5 text-center cursor-pointer group"
            >
              <div className="w-14 h-14 mx-auto mb-3 bg-brand-sky rounded-2xl flex items-center justify-center text-3xl group-hover:bg-brand-blue/10 transition-colors">
                {service.icon}
              </div>
              <h3 className="font-display font-semibold text-gray-900 text-sm mb-1">{service.name}</h3>
              <p className="text-xs text-brand-orange font-semibold">{service.price}</p>
              <p className="text-xs text-gray-500 mt-1 leading-tight">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid md:grid-cols-2 gap-5">
          {/* Banner 1 */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-deepblue to-brand-blue p-8 text-white">
            <div className="absolute right-0 top-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/4 translate-x-1/4" />
            <div className="relative z-10">
              <span className="inline-block bg-brand-gold text-brand-navy text-xs font-bold px-3 py-1 rounded-full mb-3">LIMITED OFFER</span>
              <h3 className="font-display font-bold text-2xl mb-2">First Booking?<br/>Get 30% OFF</h3>
              <p className="text-white/70 text-sm mb-4">Use code: <span className="font-mono font-bold text-brand-gold">FIRST30</span></p>
              <button onClick={handleBook} className="bg-white text-brand-deepblue font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2">
                Book Now <ChevronRight size={15} />
              </button>
            </div>
          </div>

          {/* Banner 2 */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-brand-lightorange p-8 text-white">
            <div className="absolute right-0 bottom-0 w-40 h-40 bg-white/10 rounded-full translate-y-1/4 translate-x-1/4" />
            <div className="relative z-10">
              <span className="inline-block bg-white text-brand-orange text-xs font-bold px-3 py-1 rounded-full mb-3">BUNDLE DEAL</span>
              <h3 className="font-display font-bold text-2xl mb-2">Home Care Package<br/>Save ₹2,000</h3>
              <p className="text-white/80 text-sm mb-4">Cleaning + Electrician + Plumbing combo</p>
              <button onClick={handleBook} className="bg-white text-brand-orange font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2">
                Explore <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED SERVICES - detailed cards */}
      <section className="bg-brand-sky py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-brand-orange font-semibold text-sm uppercase tracking-wider mb-2">Top Rated</p>
            <h2 className="font-display font-bold text-3xl text-gray-900">Most Booked This Week</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.slice(0, 3).map(service => (
              <div key={service.name} onClick={handleBook} className="card overflow-hidden cursor-pointer group hover:shadow-float transition-all duration-300">
                <div className="h-40 bg-gradient-to-br from-brand-deepblue to-brand-blue flex items-center justify-center relative overflow-hidden">
                  <div className="text-7xl opacity-30 absolute right-4 bottom-2 group-hover:scale-110 transition-transform duration-500">{service.icon}</div>
                  <div className="text-6xl z-10">{service.icon}</div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display font-bold text-gray-900">{service.name}</h3>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                      <Star size={12} fill="currentColor" /> 4.9
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">{service.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-brand-deepblue">{service.price}</span>
                    <button className="text-brand-orange text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all">
                      Book <ChevronRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="why-us" className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-brand-orange font-semibold text-sm uppercase tracking-wider mb-2">Why ServiceHub</p>
          <h2 className="font-display font-bold text-3xl text-gray-900">The ServiceHub Promise</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_US.map(w => (
            <div key={w.title} className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-brand-sky rounded-2xl flex items-center justify-center text-brand-blue">
                {w.icon}
              </div>
              <h3 className="font-display font-bold text-gray-900 mb-2">{w.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-brand-sky py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-brand-orange font-semibold text-sm uppercase tracking-wider mb-2">Reviews</p>
            <h2 className="font-display font-bold text-3xl text-gray-900">What Customers Say</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="card p-6">
                <div className="flex mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400" fill="currentColor" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-brand-deepblue rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="hero-gradient py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display font-bold text-4xl text-white mb-4">
            Ready to Book Your Service?
          </h2>
          <p className="text-white/75 text-lg mb-8">
            Join 2 million+ happy customers. Book in seconds, track in real-time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={handleBook} className="bg-brand-orange hover:bg-brand-lightorange text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
              <Search size={18} /> Book a Service Now
            </button>
            <button className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2">
              <CheckCircle size={18} /> Become a Partner
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
