import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ixwtshijfgednucjhjhg.supabase.co'
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4d3RzaGlqZmdlZG51Y2poamhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMzNTAyMDIsImV4cCI6MTk4ODkyNjIwMn0.c8OXJRyAndIseYT1Qwjr_XKu2NZURKTK8aTpiiVzcYQ"

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;