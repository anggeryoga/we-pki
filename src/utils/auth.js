import { supabase } from '../config/supabase.js';

export class AuthManager {
  static async login(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async getCurrentUser() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      return session?.user || null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  static async checkAdminRole(userId) {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return !!data;
    } catch (error) {
      console.error('Error checking admin role:', error);
      return false;
    }
  }

  static async createAdminUser(email, password) {
    try {
      // First create the user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password
      });

      if (authError) throw authError;

      // Then add them to admin_users table
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .insert([{
          user_id: authData.user.id,
          role: 'admin'
        }])
        .select()
        .single();

      if (adminError) throw adminError;

      return { success: true, user: authData.user, admin: adminData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static redirectToLogin() {
    window.location.href = '/login.html';
  }

  static redirectToDashboard() {
    window.location.href = '/admin.html';
  }
}