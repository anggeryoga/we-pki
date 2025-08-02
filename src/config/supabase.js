import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vyhwfepblcwczxiupyvz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5aHdmZXBibGN3Y3p4aXVweXZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxNTQxODUsImV4cCI6MjA2OTczMDE4NX0.GZdJMfZLzZrkPaz_M-EvC5RFrkZqs9vIIkRW17Xtpdw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
