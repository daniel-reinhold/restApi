let express = require('express')
const RoutesHelper = require('./routesHelper')
const { db } = require('../database')

let router = express.Router()

RoutesHelper.GET(router, '/notes/:id', req => db.notes.find(req.params.id))

RoutesHelper.POST(router, '/notes/create', () => db.notes.create())
RoutesHelper.POST(router, '/notes/drop', () => db.notes.drop())
RoutesHelper.POST(router, '/notes/add', req => db.notes.add(req.query))

RoutesHelper.PATCH(router, '/notes/:id', req => db.notes.edit(req.params.id, req.query))
RoutesHelper.PATCH(router, '/notes/:id/done', req => db.notes.setDone(req.params.id))

RoutesHelper.DELETE(router, '/notes', () => db.notes.empty())
RoutesHelper.DELETE(router, '/notes/:id', req => db.notes.delete(req.params.id))

module.exports = router