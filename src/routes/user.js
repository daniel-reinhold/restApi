let express = require('express')
const RoutesHelper = require('./routesHelper')
const { db } = require('../database')

let router = express.Router()

RoutesHelper.GET(router,'/users', () => db.users.all())
RoutesHelper.GET(router, '/users/:id', req => db.users.find(req.params.id))

RoutesHelper.POST(router, '/users/add', req => db.users.add(req.query))
RoutesHelper.POST(router, '/users/:id/notes', req => db.notes.getForUser(req.params.id))

RoutesHelper.PATCH(router, '/users/:id', req => db.users.edit(req.params.id, req.query))

RoutesHelper.DELETE(router, '/users', () => db.users.empty())
RoutesHelper.DELETE(router, '/users/:id', req => db.users.delete(req.params.id))

module.exports = router