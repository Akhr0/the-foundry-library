import { Router } from 'express'
import * as ctl from '../controllers/ficheController.js'
const r = Router()

r.get('/', ctl.list)
r.post('/', ctl.create)
r.get('/:id', ctl.read)
r.put('/:id', ctl.update)
r.delete('/:id', ctl.remove)

export default r
