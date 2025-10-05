
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import * as ai from '../services/aiService.js'
import * as db from '../services/dbService.js'
import schema from '../schemas/itemSchema.json' assert {{ type: 'json' }}

const ajv = new Ajv({{ allErrors: true, strict: false }})
addFormats(ajv)
const validate = ajv.compile(schema)

export async function list(req, res, next){{
  try {{
    const rows = await db.list('items', req.query)
    res.json(rows)
  }} catch (e) {{ next(e) }}
}}

export async function create(req, res, next){{
  try {{
    let data = req.body
    // Passage IA obligatoire pour conformité DA
    const map = {{
      item: ai.normalizeItem,
      spell: ai.normalizeSpell,
      fiche: ai.normalizeFiche,
      user: ai.normalizeUser
    }}
    const fn = map['item'] || (x=>x)
    data = await fn(data)
    const valid = validate(data)
    if (!valid) return res.status(400).json({{ errors: validate.errors }})
    const saved = await db.create('items', data)
    res.status(201).json(saved)
  }} catch (e) {{ next(e) }}
}}

export async function read(req, res, next){{
  try {{
    const row = await db.read('items', req.params.id)
    if (!row) return res.status(404).json({{ error: 'Not found' }})
    res.json(row)
  }} catch (e) {{ next(e) }}
}}

export async function update(req, res, next){{
  try {{
    const data = req.body
    const valid = validate(data)
    if (!valid) return res.status(400).json({{ errors: validate.errors }})
    const row = await db.update('items', req.params.id, data)
    res.json(row)
  }} catch (e) {{ next(e) }}
}}

export async function remove(req, res, next){{
  try {{
    await db.remove('items', req.params.id)
    res.status(204).end()
  }} catch (e) {{ next(e) }}
}}
