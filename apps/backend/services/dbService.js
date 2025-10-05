import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE || ''
)

const tableMap = {
  items: 'creations',
  spells: 'creations',
  fiches: 'creations',
  users: 'users'
}

// --- Lister tous les enregistrements ---
export async function list(kind, query = {}) {
  const table = tableMap[kind] || kind
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .limit(50)
  if (error) throw error
  return data
}

// --- Créer un nouvel enregistrement ---
export async function create(kind, data) {
  const table = tableMap[kind] || kind
  const payload = table === 'creations'
    ? { type: kind.slice(0, -1), data }
    : data

  const { data: rows, error } = await supabase
    .from(table)
    .insert(payload)
    .select()
    .single()

  if (error) throw error
  return rows
}

// --- Lire un enregistrement spécifique ---
export async function read(kind, id) {
  const table = tableMap[kind] || kind
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

// --- Mettre à jour un enregistrement ---
export async function update(kind, id, patch) {
  const table = tableMap[kind] || kind
  const { data, error } = await supabase
    .from(table)
    .update(patch)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

// --- Supprimer un enregistrement ---
export async function remove(kind, id) {
  const table = tableMap[kind] || kind
  const { error } = await supabase
    .from(table)
    .delete()
    .eq('id', id)
  if (error) throw error
  return true
}
