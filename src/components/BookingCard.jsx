import React from 'react'
import { Calendar, MapPin, Clock, FileText } from 'lucide-react'
import StatusBadge from './StatusBadge'

const SERVICE_ICONS = {
  'AC Repair': '❄️',
  'Plumbing': '🔧',
  'Cleaning': '🧹',
  'Electrician': '⚡',
  'Painting': '🎨',
  'Appliance Repair': '🔌',
}

export default function BookingCard({ booking, onAccept, onDeliver, isVendor = false }) {
  return (
    <div className="card p-5 hover:shadow-float transition-all duration-300 border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-brand-sky rounded-xl flex items-center justify-center text-2xl">
            {SERVICE_ICONS[booking.service] || '🔨'}
          </div>
          <div>
            <h3 className="font-display font-semibold text-gray-900 text-sm">{booking.service}</h3>
            {isVendor && (
              <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                Customer: <span className="font-medium text-brand-blue">{booking.customer_phone}</span>
              </p>
            )}
          </div>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs text-gray-600 mb-4">
        <div className="flex items-center gap-1.5">
          <Calendar size={12} className="text-brand-blue" />
          <span>{booking.date}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={12} className="text-brand-blue" />
          <span>{booking.time}</span>
        </div>
        <div className="flex items-start gap-1.5 col-span-2">
          <MapPin size={12} className="text-brand-blue mt-0.5 flex-shrink-0" />
          <span className="truncate">{booking.address}</span>
        </div>
        {booking.notes && (
          <div className="flex items-start gap-1.5 col-span-2">
            <FileText size={12} className="text-brand-blue mt-0.5 flex-shrink-0" />
            <span className="text-gray-500 italic">{booking.notes}</span>
          </div>
        )}
      </div>

      {isVendor && (
        <div className="pt-3 border-t border-gray-100">
          {booking.status === 'pending' && (
            <button
              onClick={() => onAccept(booking.id)}
              className="w-full bg-brand-deepblue hover:bg-brand-blue text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
            >
              ✓ Accept Booking
            </button>
          )}
          {booking.status === 'accepted' && (
            <button
              onClick={() => onDeliver(booking.id)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
            >
              ✓ Mark as Delivered
            </button>
          )}
          {booking.status === 'delivered' && (
            <div className="w-full text-center text-emerald-600 text-sm font-semibold py-2.5 bg-emerald-50 rounded-xl">
              ✓ Service Delivered
            </div>
          )}
        </div>
      )}
    </div>
  )
}
