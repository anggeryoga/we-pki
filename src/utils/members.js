import { supabase } from '../config/supabase.js';

export class MemberManager {
  static async submitMemberForm(formData) {
    try {
      const { data, error } = await supabase
        .from('member_forms')
        .insert([{
          name: formData.name,
          region: formData.region,
          cat_info: formData.cat_info,
          reason: formData.reason,
          status: 'pending',
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async getAllMemberForms() {
    try {
      const { data, error } = await supabase
        .from('member_forms')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async updateMemberFormStatus(id, status) {
    try {
      const { data, error } = await supabase
        .from('member_forms')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async deleteMemberForm(id) {
    try {
      const { error } = await supabase
        .from('member_forms')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async getMemberStats() {
    try {
      const { data, error } = await supabase
        .from('member_forms')
        .select('status');

      if (error) throw error;
      
      const total = data.length;
      const pending = data.filter(form => form.status === 'pending').length;
      const approved = data.filter(form => form.status === 'approved').length;
      const rejected = data.filter(form => form.status === 'rejected').length;

      return { 
        success: true, 
        stats: { total, pending, approved, rejected }
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}