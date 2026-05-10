import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, RefreshCw, X, CheckCircle, Clock } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BookingCard from '../components/BookingCard'
import { supabase } from '../supabase/client'

const SERVICES = ['AC Repair', 'Plumbing', 'Cleaning', 'Electrician', 'Painting', 'Appliance Repair']

const TIME_SLOTS = [
  '08:00 AM – 10:00 AM',
  '10:00 AM – 12:00 PM',
  '12:00 PM – 02:00 PM',
  '02:00 PM – 04:00 PM',
  '04:00 PM – 06:00 PM',
  '06:00 PM – 08:00 PM',
]

// Local storage fallback for demo
const LOCAL_KEY = 'servicehub_bookings'

function getLocalBookings(phone) {
  try {
    const all = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]')
    return all.filter(b => b.customer_phone === phone)
  } catch { return [] }
}

function saveLocalBooking(booking) {
  try {
    const all = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]')
    all.unshift(booking)
    localStorage.setItem(LOCAL_KEY, JSON.stringify(all))
  } catch {}
}

export default function CustomerDashboard() {
  const navigate = useNavigate()
  const phone = localStorage.getItem('customer_phone')

  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [useLocal, setUseLocal] = useState(false)

  const [form, setForm] = useState({
    service: 'AC Repair',
    address: '',
    date: '',
    time: '10:00 AM – 12:00 PM',
    notes: '',
  })

  useEffect(() => {
    if (!phone) { navigate('/login'); return }
    fetchBookings()
  }, [phone])

  const fetchBookings = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('customer_phone', phone)
        .order('created_at', { ascending: false })

      if (error) throw error
      setBookings(data || [])
      setUseLocal(false)
    } catch {
      // Fallback to localStorage
      setBookings(getLocalBookings(phone))
      setUseLocal(true)
    }
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.address || !form.date) return
    setSubmitting(true)

    const newBooking = {
      id: Date.now().toString(),
      customer_phone: phone,
      service: form.service,
      address: form.address,
      date: form.date,
      time: form.time,
      notes: form.notes,
      status: 'pending',
      created_at: new Date().toISOString(),
    }

    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([{
          customer_phone: phone,
          service: form.service,
          address: form.address,
          date: form.date,
          time: form.time,
          notes: form.notes,
          status: 'pending',
        }])
        .select()
        .single()

      if (error) throw error
      setBookings(prev => [data, ...prev])
    } catch {
      // Fallback to localStorage
      saveLocalBooking(newBooking)
      setBookings(prev => [newBooking, ...prev])
    }

    setSubmitting(false)
    setSuccess(true)
    setShowForm(false)
    setForm({ service: 'AC Repair', address: '', date: '', time: '10:00 AM – 12:00 PM', notes: '' })
    setTimeout(() => setSuccess(false), 3000)
  }

  const pending = bookings.filter(b => b.status === 'pending').length
  const accepted = bookings.filter(b => b.status === 'accepted').length
  const delivered = bookings.filter(b => b.status === 'delivered').length

  return (
    <div className="min-h-screen bg-gray-50 font-body">
      <Navbar />

      {/* Header */}
      <div className="hero-gradient pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-white/70 text-sm mb-1">Welcome back 👋</p>
              <h1 className="font-display font-bold text-2xl text-white">+91 {phone}</h1>
            </div>
            <div className="flex gap-3">
              <button
                onClick={fetchBookings}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all"
              >
                <RefreshCw size={14} /> Refresh
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 bg-brand-orange hover:bg-brand-lightorange text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-md"
              >
                <Plus size={16} /> Book Service
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { label: 'Pending', value: pending, color: 'text-amber-300' },
              { label: 'Accepted', value: accepted, color: 'text-blue-300' },
              { label: 'Delivered', value: delivered, color: 'text-emerald-300' },
            ].map(s => (
              <div key={s.label} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
                <div className={`font-display font-bold text-2xl ${s.color}`}>{s.value}</div>
                <div className="text-white/60 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {useLocal && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 text-sm px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
            <Clock size={14} /> Demo mode: Data stored locally. Configure Supabase for persistent storage.
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
            <CheckCircle size={14} /> Booking confirmed! A vendor will accept your request shortly.
          </div>
        )}

        {/* Booking Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-hero w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div>
                  <h2 className="font-display font-bold text-xl text-gray-900">Book a Service</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Fill in the details below</p>
                </div>
                <button onClick={() => setShowForm(false)} className="w-9 h-9 rounded-xl hover:bg-gray-100 flex items-center justify-center">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                  <label className="label">Service Type</label>
                  <select
                    value={form.service}
                    onChange={e => setForm({ ...form, service: e.target.value })}
                    className="input-field"
                  >
                    {SERVICES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="label">Service Address</label>
                  <textarea
                    value={form.address}
                    onChange={e => setForm({ ...form, address: e.target.value })}
                    placeholder="Enter your full address with area and city"
                    rows={2}
                    className="input-field resize-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">Preferred Date</label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={e => setForm({ ...form, date: e.target.value })}
                      className="input-field"
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  <div>
                    <label className="label">Time Slot</label>
                    <select
                      value={form.time}
                      onChange={e => setForm({ ...form, time: e.target.value })}
                      className="input-field"
                    >
                      {TIME_SLOTS.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="label">Additional Notes <span className="text-gray-400 font-normal normal-case tracking-normal">(optional)</span></label>
                  <textarea
                    value={form.notes}
                    onChange={e => setForm({ ...form, notes: e.target.value })}
                    placeholder="Any specific requirements or instructions..."
                    rows={2}
                    className="input-field resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 btn-secondary py-3"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 btn-primary py-3 disabled:opacity-60"
                  >
                    {submitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Booking...
                      </span>
                    ) : 'Confirm Booking'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Bookings list */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-xl text-gray-900">My Bookings</h2>
          <span className="text-sm text-gray-500">{bookings.length} total</span>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map(i => (
              <div key={i} className="card p-5 animate-pulse">
                <div className="flex gap-3 mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-100 rounded mb-2 w-2/3" />
                    <div className="h-3 bg-gray-100 rounded w-1/3" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-100 rounded" />
                  <div className="h-3 bg-gray-100 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="font-display font-bold text-xl text-gray-800 mb-2">No bookings yet</h3>
            <p className="text-gray-500 mb-6">Book your first home service and experience the difference</p>
            <button onClick={() => setShowForm(true)} className="btn-primary px-8">
              + Book a Service
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {bookings.map(booking => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
