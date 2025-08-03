import { supabase } from '../config/supabase.js';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import slugify from 'slugify';

// Configure marked for better formatting
marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: true,
  mangle: false
});

export class BlogManager {
  static async createArticle(articleData) {
    try {
      const slug = slugify(articleData.title, { 
        lower: true, 
        strict: true,
        remove: /[*+~.()'"!:@]/g
      });
      
      // Check if slug already exists
      const { data: existingArticle } = await supabase
        .from('articles')
        .select('id')
        .eq('slug', slug)
        .single();

      let finalSlug = slug;
      if (existingArticle) {
        finalSlug = `${slug}-${Date.now()}`;
      }

      const contentHtml = this.processMarkdown(articleData.content);

      const { data, error } = await supabase
        .from('articles')
        .insert([{
          ...articleData,
          slug: finalSlug,
          content_html: contentHtml,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async updateArticle(id, articleData) {
    try {
      const slug = slugify(articleData.title, { 
        lower: true, 
        strict: true,
        remove: /[*+~.()'"!:@]/g
      });
      
      // Check if slug already exists (excluding current article)
      const { data: existingArticle } = await supabase
        .from('articles')
        .select('id')
        .eq('slug', slug)
        .neq('id', id)
        .single();

      let finalSlug = slug;
      if (existingArticle) {
        finalSlug = `${slug}-${Date.now()}`;
      }

      const contentHtml = this.processMarkdown(articleData.content);
      
      const { data, error } = await supabase
        .from('articles')
        .update({
          ...articleData,
          slug: finalSlug,
          content_html: contentHtml,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static processMarkdown(content) {
    // Process markdown with custom styling
    let html = marked(content);
    
    // Add custom classes for styling
    html = html.replace(/<h1>/g, '<h1 class="text-3xl font-bold mb-4 text-red-600 font-[\'Press_Start_2P\']">');
    html = html.replace(/<h2>/g, '<h2 class="text-2xl font-bold mb-3 text-red-500 font-[\'Press_Start_2P\']">');
    html = html.replace(/<h3>/g, '<h3 class="text-xl font-bold mb-2 text-amber-200 font-[\'Press_Start_2P\']">');
    html = html.replace(/<p>/g, '<p class="mb-4 leading-relaxed font-[\'IBM_Plex_Mono\']">');
    html = html.replace(/<ul>/g, '<ul class="list-disc list-inside mb-4 space-y-2 font-[\'IBM_Plex_Mono\']">');
    html = html.replace(/<ol>/g, '<ol class="list-decimal list-inside mb-4 space-y-2 font-[\'IBM_Plex_Mono\']">');
    html = html.replace(/<li>/g, '<li class="text-amber-100">');
    html = html.replace(/<blockquote>/g, '<blockquote class="border-l-4 border-red-700 pl-4 my-4 italic text-amber-200 bg-gray-900 p-4">');
    html = html.replace(/<code>/g, '<code class="bg-red-900 text-amber-200 px-2 py-1 rounded font-[\'IBM_Plex_Mono\']">');
    html = html.replace(/<pre>/g, '<pre class="bg-gray-900 border border-red-700 p-4 rounded mb-4 overflow-x-auto">');
    html = html.replace(/<a /g, '<a class="text-red-400 hover:text-red-300 underline" ');
    html = html.replace(/<strong>/g, '<strong class="font-bold text-amber-200">');
    html = html.replace(/<em>/g, '<em class="italic text-amber-300">');

    return DOMPurify.sanitize(html);
  }

  static async deleteArticle(id) {
    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async getArticles(limit = 10, offset = 0) {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async getArticleBySlug(slug) {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async getAllArticlesForAdmin() {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async getArticleStats() {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('published');

      if (error) throw error;
      
      const total = data.length;
      const published = data.filter(article => article.published).length;
      const drafts = total - published;

      return { 
        success: true, 
        stats: { total, published, drafts }
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}