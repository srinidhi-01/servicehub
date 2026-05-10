import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, Wrench, Eye, EyeOff, ChevronRight } from 'lucide-react'

const VENDOR_EMAIL = 'vendor@servicehub.com'
const VENDOR_PASSWORD = 'vendor123'

export default function VendorLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) { setError('Please fill in all fields.'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    if (email.toLowerCase() === VENDOR_EMAIL && password === VENDOR_PASSWORD) {
      localStorage.setItem('vendor_logged_in', 'true')
      navigate('/vendor/dashboard')
    } else {
      setError('Invalid credentials. Use demo credentials below.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-gradient-to-br from-brand-navy via-brand-deepblue to-brand-blue p-12 relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-white/5"
              style={{ width: `${120 + i * 80}px`, height: `${120 + i * 80}px`, top: `${20 + i * 10}%`, right: `${-10 + i * 5}%` }} />
          ))}
        </div>

        <Link to="/" className="flex items-center gap-2 relative z-10">
          <div className="w-9 h-9 bg-brand-orange rounded-xl flex items-center justify-center">
            <Wrench size={18} className="text-white" />
          </div>
          <span className="font-display font-bold text-xl text-white">
            Service<span className="text-brand-gold">Hub</span>
          </span>
        </Link>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-brand-gold text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            🔧 Partner Portal
          </div>
          <h2 className="font-display font-bold text-4xl text-white leading-tight mb-4">
            Grow Your<br/>Business with Us
          </h2>
          <p className="text-white/70 text-base mb-8">
            Manage all your service bookings in one powerful dashboard.
          </p>

          <div className="space-y-4">
            {[
              { icon: '📊', title: 'Real-time bookings', desc: 'Instant updates on new requests' },
              { icon: '💰', title: 'Instant payments', desc: 'Fast and secure payouts' },
              { icon: '⭐', title: 'Build your reputation', desc: 'Grow with customer ratings' },
            ].map(f => (
              <div key={f.title} className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-lg flex-shrink-0">{f.icon}</div>
                <div>
                  <p className="text-white font-semibold text-sm">{f.title}</p>
                  <p className="text-white/60 text-xs">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 bg-white/10 border border-white/20 rounded-2xl p-4">
          <p className="text-white/70 text-xs mb-1">Demo credentials</p>
          <p className="text-white font-mono text-sm">vendor@servicehub.com</p>
          <p className="text-brand-gold font-mono text-sm font-bold">vendor123</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center">
                <Wrench size={15} className="text-white" />
              </div>
              <span className="font-display font-bold text-xl text-brand-deepblue">
                Service<span className="text-brand-orange">Hub</span>
              </span>
            </Link>
          </div>

          <div className="mb-8">
            <div className="w-14 h-14 bg-brand-sky rounded-2xl flex items-center justify-center mb-4">
              <Wrench size={24} className="text-brand-deepblue" />
            </div>
            <h1 className="font-display font-bold text-2xl text-gray-900 mb-2">Vendor Login</h1>
            <p className="text-gray-500 text-sm">Access your partner dashboard</p>
          </div>

          {/* Demo credentials card */}
          <div className="bg-brand-sky border border-brand-blue/20 rounded-xl p-4 mb-6">
            <p className="text-xs text-brand-deepblue font-semibold mb-2">🔑 Demo Credentials</p>
            <div className="text-sm space-y-1">
              <p><span className="text-gray-500">Email:</span> <span className="font-mono font-medium text-gray-800">vendor@servicehub.com</span></p>
              <p><span className="text-gray-500">Password:</span> <span className="font-mono font-bold text-brand-orange">vendor123</span></p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="vendor@servicehub.com"
                  className="input-field pl-11"
                />
              </div>
            </div>

            <div>
              <label className="label">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="input-field pl-11 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3.5 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : 'Sign In →'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">Are you a customer?{' '}
              <Link to="/login" className="text-brand-blue font-semibold hover:underline">
                Customer Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
