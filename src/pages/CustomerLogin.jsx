import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Phone, ArrowLeft, Shield, ChevronRight, Wrench } from 'lucide-react'
import { supabase } from '../supabase/client'

const DEMO_OTP = '123456'

export default function CustomerLogin() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1) // 1 = phone, 2 = otp
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handlePhoneSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!phone || phone.length < 10) {
      setError('Please enter a valid 10-digit phone number.')
      return
    }
    setLoading(true)
    // Simulate OTP send delay
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    setStep(2)
  }

  const handleOtpDigit = (index, value) => {
    if (!/^\d?$/.test(value)) return
    const next = [...otpDigits]
    next[index] = value
    setOtpDigits(next)
    const combined = next.join('')
    setOtp(combined)
    // Auto-focus next
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus()
    }
  }

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus()
    }
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const entered = otpDigits.join('')
    if (entered !== DEMO_OTP) {
      setError('Incorrect OTP. Use demo OTP: 123456')
      return
    }
    setLoading(true)
    try {
      // Upsert customer record
      const { error: dbError } = await supabase
        .from('customers')
        .upsert([{ phone }], { onConflict: 'phone' })
      if (dbError && !dbError.message.includes('relation') && !dbError.message.includes('JWT')) {
        console.warn('Supabase note:', dbError.message)
      }
    } catch (err) {
      // Continue even if Supabase is not configured
    }
    localStorage.setItem('customer_phone', phone)
    setLoading(false)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left panel - decorative */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 hero-gradient p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-white"
              style={{
                width: `${(i + 1) * 80}px`,
                height: `${(i + 1) * 80}px`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
        </div>
        <Link to="/" className="flex items-center gap-2 relative z-10">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
            <Wrench size={18} className="text-white" />
          </div>
          <span className="font-display font-bold text-xl text-white">
            Service<span className="text-brand-gold">Hub</span>
          </span>
        </Link>
        <div className="relative z-10">
          <h2 className="font-display font-bold text-4xl text-white leading-tight mb-4">
            Book Services<br/>in 60 Seconds
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Join 2 million+ customers who trust ServiceHub for home services.
          </p>
          <div className="space-y-4">
            {['Verified professionals only', '30-day service guarantee', 'Transparent pricing'].map(f => (
              <div key={f} className="flex items-center gap-3 text-white/80">
                <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                  <ChevronRight size={12} />
                </div>
                <span className="text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-lg">⭐</div>
            <div>
              <p className="text-white font-semibold text-sm">"Booked in minutes, fixed in an hour!"</p>
              <p className="text-white/60 text-xs mt-0.5">— Verified Customer, Bengaluru</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
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

          {step === 1 ? (
            <div className="float-in">
              <div className="mb-8">
                <div className="w-14 h-14 bg-brand-sky rounded-2xl flex items-center justify-center mb-4">
                  <Phone size={24} className="text-brand-deepblue" />
                </div>
                <h1 className="font-display font-bold text-2xl text-gray-900 mb-2">Welcome Back</h1>
                <p className="text-gray-500 text-sm">Enter your mobile number to continue</p>
              </div>

              <form onSubmit={handlePhoneSubmit} className="space-y-4">
                <div>
                  <label className="label">Mobile Number</label>
                  <div className="flex">
                    <div className="flex items-center px-4 bg-gray-50 border border-gray-200 border-r-0 rounded-l-xl text-sm font-medium text-gray-600">
                      🇮🇳 +91
                    </div>
                    <input
                      type="tel"
                      placeholder="Enter 10-digit number"
                      value={phone}
                      onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="flex-1 border border-gray-200 rounded-r-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                      maxLength={10}
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                    {error}
                  </div>
                )}

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700">
                  <span className="font-semibold">Demo Mode:</span> Any phone number works. OTP will be <span className="font-mono font-bold">123456</span>
                </div>

                <button
                  type="submit"
                  disabled={loading || phone.length < 10}
                  className="w-full btn-primary py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending OTP...
                    </span>
                  ) : 'Get OTP →'}
                </button>

                <p className="text-center text-xs text-gray-500">
                  By continuing, you agree to our{' '}
                  <a href="#" className="text-brand-blue font-medium">Terms of Service</a>
                </p>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-500">Are you a service partner?{' '}
                  <Link to="/vendor/login" className="text-brand-blue font-semibold hover:underline">
                    Vendor Login
                  </Link>
                </p>
              </div>
            </div>
          ) : (
            <div className="float-in">
              <button
                onClick={() => { setStep(1); setOtpDigits(['', '', '', '', '', '']); setError('') }}
                className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 text-sm mb-8 transition-colors"
              >
                <ArrowLeft size={15} /> Back
              </button>

              <div className="mb-8">
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-4">
                  <Shield size={24} className="text-green-600" />
                </div>
                <h1 className="font-display font-bold text-2xl text-gray-900 mb-1">Verify OTP</h1>
                <p className="text-gray-500 text-sm">
                  Code sent to +91 {phone}
                </p>
              </div>

              <div className="bg-brand-sky border border-brand-blue/20 rounded-xl p-4 mb-6 text-center">
                <p className="text-sm text-brand-deepblue font-medium">
                  📱 Demo OTP for evaluation:
                </p>
                <p className="font-mono font-bold text-2xl text-brand-orange mt-1 tracking-widest">123456</p>
              </div>

              <form onSubmit={handleOtpSubmit} className="space-y-5">
                <div>
                  <label className="label text-center block">Enter 6-digit OTP</label>
                  <div className="flex gap-2 justify-center">
                    {otpDigits.map((digit, i) => (
                      <input
                        key={i}
                        id={`otp-${i}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={e => handleOtpDigit(i, e.target.value)}
                        onKeyDown={e => handleOtpKeyDown(i, e)}
                        className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all bg-white"
                      />
                    ))}
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || otpDigits.join('').length < 6}
                  className="w-full btn-primary py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Verifying...
                    </span>
                  ) : 'Verify & Continue →'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
