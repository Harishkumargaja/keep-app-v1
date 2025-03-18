// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rojqpylyzaaryefgalrp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvanFweWx5emFhcnllZmdhbHJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxODcwNjYsImV4cCI6MjA1Nzc2MzA2Nn0.4CbjARN73KTJVma3Yarf2CNT6FyPw2qGW9ENyv_f5Ns';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);