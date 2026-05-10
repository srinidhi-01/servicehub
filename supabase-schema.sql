-- ============================================================
-- ServiceHub Supabase Database Schema
-- Run these queries in Supabase SQL Editor
-- ============================================================

-- 1. Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  phone TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_phone TEXT NOT NULL,
  service TEXT NOT NULL,
  address TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  notes TEXT DEFAULT '',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'delivered')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_bookings_customer_phone ON bookings(customer_phone);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies - Allow all operations for anon (demo mode)
-- In production, replace with proper auth-based policies

-- Customers policies
CREATE POLICY "Allow read customers" ON customers
  FOR SELECT USING (true);

CREATE POLICY "Allow insert customers" ON customers
  FOR INSERT WITH CHECK (true);

-- Bookings policies
CREATE POLICY "Allow read bookings" ON bookings
  FOR SELECT USING (true);

CREATE POLICY "Allow insert bookings" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update bookings" ON bookings
  FOR UPDATE USING (true);

-- 6. Enable Realtime for bookings (for live vendor dashboard)
ALTER PUBLICATION supabase_realtime ADD TABLE bookings;

-- 7. Sample data (optional - for testing)
INSERT INTO bookings (customer_phone, service, address, date, time, notes, status)
VALUES
  ('9876543210', 'AC Repair', 'Flat 4B, Green Valley Apts, Koramangala, Bengaluru', '2025-02-15', '10:00 AM – 12:00 PM', 'Please bring spare filters', 'pending'),
  ('9876543210', 'Plumbing', '12 MG Road, Indiranagar, Bengaluru', '2025-02-10', '08:00 AM – 10:00 AM', '', 'delivered'),
  ('8765432109', 'Cleaning', 'Villa 7, Prestige Enclave, Whitefield, Bengaluru', '2025-02-18', '02:00 PM – 04:00 PM', '3BHK needs full deep clean', 'accepted');
