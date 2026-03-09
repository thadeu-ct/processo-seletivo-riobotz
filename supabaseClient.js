import { createClient } from '@supabase/supabase-js'

// Lendo as variáveis de ambiente injetadas pela Vercel
// (Ajuste o import.meta.env para process.env.REACT_APP se estiver usando Create React App em vez de Vite)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
