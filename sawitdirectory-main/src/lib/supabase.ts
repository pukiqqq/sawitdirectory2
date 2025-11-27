import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Mill {
  id: string;
  nama_pabrik: string;
  nama_perusahaan: string;
  provinsi: string;
  kabupaten_kota: string;
  kapasitas_olah: number;
  tahun_operasi: number;
  latitude: number;
  longitude: number;
  created_at: string;
  updated_at: string;
  created_by?: string;
}
