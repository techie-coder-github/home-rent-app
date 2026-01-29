
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// TODO: Replace with your actual Supabase project credentials
const SUPABASE_URL = 'https://ocyinxpoqxcaazikslxq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jeWlueHBvcXhjYWF6aWtzbHhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2Njc0MjAsImV4cCI6MjA4NTI0MzQyMH0.aoqbAYdKuHhExRRnX3V5Jxa0ma7MPF86FaLZ3PpZVtU';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});
