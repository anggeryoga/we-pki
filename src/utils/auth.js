// src/utils/auth.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vyhwfepblcwczxiupyvz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5aHdmZXBibGN3Y3p4aXVweXZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxNTQxODUsImV4cCI6MjA2OTczMDE4NX0.GZdJMfZLzZrkPaz_M-EvC5RFrkZqs9vIIkRW17Xtpdw';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const AuthManager = {
  async login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data.user;
  },

  async getCurrentUser() {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error || !session) {
      throw new Error('No active session found');
    }

    return session.user;
  },

  async logout() {
    await supabase.auth.signOut();
  }
};
