import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const supabase = createClient(
  Constants.expoConfig?.extra?.SUPABASE_URL || process.env.SUPABASE_URL,
  Constants.expoConfig?.extra?.SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY
);

export default supabase;