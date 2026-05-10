import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { RefreshCw, Filter, LogOut, Wrench, TrendingUp, Users, CheckCircle, Clock } from 'lucide-react'
import BookingCard from '../components/BookingCard'
import { supabase } from '../supabase/client'

// Local storage fallback
const LOCAL_KEY = 'servicehub_bookings'

function getAllLocalBookings() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]')
  } catch { return [] }
}

function updateLocalBookingStatus(id, status) {
  try {
    const all = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]')
    const updated = all.map(b => b.id === id ? { ...b, status } : b)
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updated))
    return updated
  } catch { return [] }
}

export default function VendorDashboard() {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [useLocal, setUseLocal] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    const isVendor = localStorage.getItem('vendor_logged_in') === 'true'
    if (!isVendor) { navigate('/vendor/login'); return }
    fetchBookings()

    // Realtime subscription attempt
    let channel
    try {
      channel = supabase
        .channel('bookings_changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, () => {
          fetchBookings()
        })
        .subscribe()
    } catch {}

    return () => { if (channel) supabase.removeChannel(channel) }
  }, [])

  const fetchBookings = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      setBookings(data || [])
      setUseLocal(false)
    } catch {
      setBookings(getAllLocalBookings())
      setUseLocal(true)
    }
    setLoading(false)
  }

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleAccept = async (id) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'accepted' })
        .eq('id', id)
      if (error) throw error
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'accepted' } : b))
    } catch {
      const updated = updateLocalBookingStatus(id, 'accepted')
      setBookings(updated)
    }
    showToast('Booking accepted!')
  }

  const handleDeliver = async (id) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'delivered' })
        .eq('id', id)
      if (error) throw error
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'delivered' } : b))
    } catch {
      const updated = updateLocalBookingStatus(id, 'delivered')
      setBookings(updated)
    }
    showToast('Marked as delivered! ✅')
  }

  const handleLogout = () => {
    localStorage.removeItem('vendor_logged_in')
    navigate('/vendor/login')
  }

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter)

  const pending = bookings.filter(b => b.status === 'pending').length
  const accepted = bookings.filter(b => b.status === 'accepted').length
  const delivered = bookings.filter(b => b.status === 'delivered').length

  return (
    <div className="min-h-screen bg-gray-50 font-body">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl shadow-float text-white text-sm font-semibold flex items-center gap-2 transition-all ${
          toast.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
        }`}>
          <CheckCircle size={15} /> {toast.msg}
        </div>
      )}

      {/* Vendor Navbar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-brand-orange rounded-xl flex items-center justify-center">
              <Wrench size={18} className="text-white" />
            </div>
            <div>
              <span className="font-display font-bold text-brand-deepblue">Service<span className="text-brand-orange">Hub</span></span>
              <span className="ml-2 bg-brand-sky text-brand-deepblue text-xs font-semibold px-2 py-0.5 rounded-full">Vendor</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={fetchBookings} className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 text-sm transition-colors">
              <RefreshCw size={14} /> Refresh
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="hero-gradient py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="font-display font-bold text-2xl text-white mb-1">Vendor Dashboard</h1>
          <p className="text-white/70 text-sm">Manage and update all service bookings</p>

          {/* Stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            {[
              { label: 'Total', value: bookings.length, icon: <Users size={18} />, color: 'text-white' },
              { label: 'Pending', value: pending, icon: <Clock size={18} />, color: 'text-amber-300' },
              { label: 'Accepted', value: accepted, icon: <TrendingUp size={18} />, color: 'text-blue-300' },
              { label: 'Delivered', value: delivered, icon: <CheckCircle size={18} />, color: 'text-emerald-300' },
            ].map(s => (
              <div key={s.label} className="bg-white/10 border border-white/10 rounded-xl p-4">
                <div className={`flex items-center gap-2 mb-1 ${s.color}`}>{s.icon}<span className="text-xs font-medium">{s.label}</span></div>
                <div className="font-display font-bold text-2xl text-white">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {useLocal && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 text-sm px-4 py-3 rounded-xl mb-6">
            Demo mode: Using local storage. Configure Supabase for live data.
          </div>
        )}

        {/* Filter tabs */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <span className="text-sm text-gray-500 flex items-center gap-1.5 mr-2">
            <Filter size={14} /> Filter:
          </span>
          {['all', 'pending', 'accepted', 'delivered'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${
                filter === f
                  ? 'bg-brand-deepblue text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-blue hover:text-brand-blue'
              }`}
            >
              {f} {f === 'all' ? `(${bookings.length})` : f === 'pending' ? `(${pending})` : f === 'accepted' ? `(${accepted})` : `(${delivered})`}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map(i => (
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
                <div className="h-10 bg-gray-100 rounded-xl mt-4" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="font-display font-bold text-xl text-gray-800 mb-2">
              {filter === 'all' ? 'No bookings yet' : `No ${filter} bookings`}
            </h3>
            <p className="text-gray-500 text-sm">Bookings will appear here when customers place orders</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(booking => (
              <BookingCard
                key={booking.id}
                booking={booking}
                isVendor
                onAccept={handleAccept}
                onDeliver={handleDeliver}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
