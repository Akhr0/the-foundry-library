import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import * as ai from '../services/aiService.js'
import * as db from '../services/dbService.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const schemaPath = path.join(__dirname, '../schemas/userSchema.json')
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))

const ajv = new Ajv({ allErrors: true, strict: false })
addFormats(ajv)
const validate = ajv.compile(schema)

export async function list(req, res, next) {
  try {
    const rows = await db.list('users', req.query)
    res.json(rows)
  } catch (e) { next(e) }
}

export async function create(req, res, next) {
  try {
    let data = req.body
    data = await ai.normalizeUser(data)
    const valid = validate(data)
    if (!valid) return res.status(400).json({ errors: validate.errors })
    const saved = await db.create('users', data)
    res.status(201).json(saved)
  } catch (e) { next(e) }
}

export async function read(req, res, next) {
  try {
    const row = await db.read('users', req.params.id)
    if (!row) return res.status(404).json({ error: 'Not found' })
    res.json(row)
  } catch (e) { next(e) }
}

export async function update(req, res, next) {
  try {
    const data = req.body
    const valid = validate(data)
    if (!valid) return res.status(400).json({ errors: validate.errors })
    const row = await db.update('users', req.params.id, data)
    res.json(row)
  } catch (e) { next(e) }
}

export async function remove(req, res, next) {
  try {
    await db.remove('users', req.params.id)
    res.status(204).end()
  } catch (e) { next(e) }
}
