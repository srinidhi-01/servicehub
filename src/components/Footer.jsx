import React from 'react'
import { Link } from 'react-router-dom'
import { Wrench, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-brand-orange rounded-xl flex items-center justify-center">
                <Wrench size={18} className="text-white" />
              </div>
              <span className="font-display font-bold text-xl">
                Service<span className="text-brand-orange">Hub</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              India's most trusted home services platform. Professional service, guaranteed.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <button key={i} className="w-9 h-9 bg-white/10 hover:bg-brand-orange rounded-lg flex items-center justify-center transition-colors">
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-gray-300 mb-5">Services</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {['AC Repair & Service', 'Plumbing Solutions', 'Deep Cleaning', 'Electrical Work', 'Painting & Polish', 'Appliance Repair'].map(s => (
                <li key={s}><a href="#" className="hover:text-white transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-gray-300 mb-5">Company</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {['About Us', 'Careers', 'Blog', 'Press', 'Privacy Policy', 'Terms of Service'].map(s => (
                <li key={s}><a href="#" className="hover:text-white transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-gray-300 mb-5">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-brand-orange mt-0.5 flex-shrink-0" />
                <span>ServiceHub HQ, MG Road, Bengaluru – 560001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-brand-orange flex-shrink-0" />
                <span>1800-123-4567 (Toll Free)</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-brand-orange flex-shrink-0" />
                <span>support@servicehub.in</span>
              </li>
            </ul>
            <div className="mt-6 p-3 bg-white/5 rounded-xl text-xs text-gray-400 border border-white/10">
              <span className="text-brand-orange font-semibold">24/7 Support</span> · Available in 50+ cities
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2025 ServiceHub Technologies Pvt. Ltd. All rights reserved.</p>
          <p>Made with ❤️ in India</p>
        </div>
      </div>
    </footer>
  )
}
