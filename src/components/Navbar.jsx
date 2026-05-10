import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, User, LogOut, Wrench } from 'lucide-react'

export default function Navbar({ transparent = false }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const customerPhone = localStorage.getItem('customer_phone')
  const isVendor = localStorage.getItem('vendor_logged_in') === 'true'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('customer_phone')
    localStorage.removeItem('vendor_logged_in')
    navigate('/')
    setUserMenuOpen(false)
  }

  const navBg = transparent && !scrolled
    ? 'bg-transparent'
    : 'bg-white shadow-md'

  const textColor = transparent && !scrolled ? 'text-white' : 'text-gray-800'
  const logoColor = transparent && !scrolled ? 'text-white' : 'text-brand-deepblue'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center">
              <Wrench size={16} className="text-white" />
            </div>
            <span className={`font-display font-bold text-xl ${logoColor}`}>
              Service<span className="text-brand-orange">Hub</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className={`hidden md:flex items-center gap-8 text-sm font-medium ${textColor}`}>
            <Link to="/" className="hover:text-brand-orange transition-colors">Home</Link>
            <a href="#services" className="hover:text-brand-orange transition-colors">Services</a>
            <a href="#why-us" className="hover:text-brand-orange transition-colors">About</a>
            <Link to="/vendor/login" className="hover:text-brand-orange transition-colors">For Partners</Link>
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {customerPhone ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 px-4 py-2 rounded-xl text-sm font-medium transition-all"
                  style={{ color: transparent && !scrolled ? 'white' : '#1a1a2e' }}
                >
                  <User size={15} />
                  <span>{customerPhone}</span>
                  <ChevronDown size={13} />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-12 bg-white rounded-xl shadow-float border border-gray-100 py-2 min-w-[160px] z-50">
                    <Link
                      to="/dashboard"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-sky transition-colors"
                    >
                      <User size={14} /> My Bookings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={14} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : isVendor ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 border border-white/40 px-4 py-2 rounded-xl text-sm font-medium"
                  style={{ color: transparent && !scrolled ? 'white' : '#1a1a2e' }}
                >
                  <Wrench size={14} />
                  <span>Vendor</span>
                  <ChevronDown size={13} />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-12 bg-white rounded-xl shadow-float border border-gray-100 py-2 min-w-[160px] z-50">
                    <Link
                      to="/vendor/dashboard"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-sky"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={14} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`text-sm font-semibold px-4 py-2 rounded-xl border transition-all ${
                    transparent && !scrolled
                      ? 'border-white/40 text-white hover:bg-white/10'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Login
                </Link>
                <Link to="/login" className="btn-primary text-sm py-2">
                  Book Now
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className={`md:hidden p-2 ${textColor}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            <Link to="/" onClick={() => setMenuOpen(false)} className="block text-gray-700 py-2 text-sm font-medium">Home</Link>
            <a href="#services" onClick={() => setMenuOpen(false)} className="block text-gray-700 py-2 text-sm font-medium">Services</a>
            <Link to="/vendor/login" onClick={() => setMenuOpen(false)} className="block text-gray-700 py-2 text-sm font-medium">For Partners</Link>
            {customerPhone ? (
              <>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="block btn-secondary text-center text-sm py-2.5">My Bookings</Link>
                <button onClick={handleLogout} className="block w-full text-red-600 py-2 text-sm font-medium">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="block btn-secondary text-center text-sm py-2.5">Login</Link>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="block btn-primary text-center text-sm py-2.5">Book Now</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
