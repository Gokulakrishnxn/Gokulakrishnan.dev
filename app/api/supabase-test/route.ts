import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    return NextResponse.json({ ok: false, error: 'Missing Supabase envs' }, { status: 500 })
  }

  const supabase = createClient(url, key)
  const { data, error } = await supabase.from('public_schema_dummy' as any).select('*').limit(1)
  // Table may not exist; return env validation at least
  if (error) {
    return NextResponse.json({ ok: true, env: { url: !!url, key: !!key }, supabaseError: error.message })
  }
  return NextResponse.json({ ok: true, env: { url: !!url, key: !!key }, data })
}


