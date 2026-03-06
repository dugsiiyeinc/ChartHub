import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xezkibvwbjsabbpvjiux.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlemtpYnZ3YmpzYWJicHZqaXV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4MDQ4NTEsImV4cCI6MjA4ODM4MDg1MX0.3zyC830sxStrHxzQmQPhvwaojrt7lJQvKR-truqrOGA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
