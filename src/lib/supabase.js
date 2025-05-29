import { createClient } from '@supabase/supabase-js'

// These should be replaced with your actual Supabase URL and anon key
const supabaseUrl = 'https://rwftmnsiatowemwxrhgs.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3ZnRtbnNpYXRvd2Vtd3hyaGdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1MjM4NjEsImV4cCI6MjA2NDA5OTg2MX0.5XOdsDiW7XCDfbxxthyA7z2xgLogpKtMe4NN93MoVDk'

export const supabase = createClient(supabaseUrl, supabaseKey)
