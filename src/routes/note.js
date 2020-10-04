let express = require('express')
const RoutesHelper = require('./routesHelper')
const { db } = require('../database')

let router = express.Router()

RoutesHelper.GET(router, '/notes/:id', req => db.notes.find(req.params.id))

RoutesHelper.POST(router, '/notes/add', req => db.notes.add(req.query))

RoutesHelper.PATCH(router, '/notes/:id', req => db.notes.edit(req.params.id, req.query))

RoutesHelper.DELETE(router, '/notes', () => db.notes.empty())
RoutesHelper.DELETE(router, '/notes/:id', req => db.notes.delete(req.params.id))

module.exports = router