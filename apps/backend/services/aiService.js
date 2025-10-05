import axios from 'axios'

const endpoint = process.env.AI_ENDPOINT
const apiKey = process.env.AI_API_KEY

async function callModel(prompt, input) {
  // Si aucune IA n’est configurée, on renvoie les données telles quelles
  if (!endpoint || !apiKey) {
    return input
  }

  const { data } = await axios.post(
    endpoint,
    { prompt, input },
    { headers: { Authorization: `Bearer ${apiKey}` } }
  )

  return data?.output ?? input
}

export async function normalizeItem(data)  { return callModel('normalize:item', data) }
export async function normalizeSpell(data) { return callModel('normalize:spell', data) }
export async function normalizeFiche(data) { return callModel('normalize:fiche', data) }
export async function normalizeUser(data)  { return callModel('normalize:user', data) }
