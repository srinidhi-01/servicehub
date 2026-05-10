import React from 'react'
import { Clock, CheckCircle, Star } from 'lucide-react'

export default function StatusBadge({ status }) {
  if (status === 'pending') return (
    <span className="status-pending flex items-center gap-1.5">
      <Clock size={11} /> Pending
    </span>
  )
  if (status === 'accepted') return (
    <span className="status-accepted flex items-center gap-1.5">
      <CheckCircle size={11} /> Accepted
    </span>
  )
  if (status === 'delivered') return (
    <span className="status-delivered flex items-center gap-1.5">
      <Star size={11} /> Delivered
    </span>
  )
  return <span className="status-pending">{status}</span>
}
