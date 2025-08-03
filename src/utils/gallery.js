import { supabase } from '../config/supabase.js';

export class GalleryManager {
  static async uploadImage(file, folder = 'gallery') {
    try {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        throw new Error('Tipe file tidak didukung. Gunakan JPG, PNG, atau WebP.');
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        throw new Error('Ukuran file terlalu besar. Maksimal 5MB.');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      const { data, error } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      return { success: true, url: publicUrl, path: filePath };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async addGalleryImage(imageData) {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .insert([{
          ...imageData,
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

  static async getGalleryImages() {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async deleteGalleryImage(id) {
    try {
      // Get image path first
      const { data: image } = await supabase
        .from('gallery_images')
        .select('image_path')
        .eq('id', id)
        .single();

      if (image?.image_path) {
        // Delete from storage
        await supabase.storage
          .from('images')
          .remove([image.image_path]);
      }

      // Delete from database
      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async updateGalleryImage(id, imageData) {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .update(imageData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}