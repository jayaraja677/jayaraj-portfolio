import { supabase, isSupabaseConfigured } from '../lib/supabase';

class StorageService {
  private BUCKET_NAME = 'portfolio-assets';

  async uploadFile(file: File, folder: 'profile' | 'projects' | 'certificates' | 'resumes'): Promise<string> {
    const timestamp = Date.now();
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filePath = `${folder}/${timestamp}_${cleanFileName}`;

    if (isSupabaseConfigured && supabase) {
      try {
        const { error: uploadError } = await supabase.storage
          .from(this.BUCKET_NAME)
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: true,
          });

        if (uploadError) {
          console.error('Supabase storage upload error:', uploadError);
          throw uploadError;
        }

        const { data } = supabase.storage.from(this.BUCKET_NAME).getPublicUrl(filePath);
        return data.publicUrl;
      } catch (err) {
        console.warn('Supabase storage failed, falling back to local base64 preview', err);
      }
    }

    // Local Fallback: Convert to Base64 string for immediate in-browser display
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  }
}

export const storageService = new StorageService();
