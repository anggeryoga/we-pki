import { supabase } from '../config/supabase.js';

export const AuthManager = {
  async getCurrentUser() {
    const { data, error } = await supabase.auth.getSession();

    if (error) throw error;
    if (!data.session) throw new Error("No active session found");

    return data.session.user;
  },

  async getUserRole(userId) {
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data.role;
  }
};
