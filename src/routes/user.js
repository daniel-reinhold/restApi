let express = require('express')
let RoutesHelper = require('./routesHelper')
const { db } = require('../database')

let router = express.Router()

RoutesHelper.GET(router,'/users/all', () => db.users.all())
RoutesHelper.GET(router, '/users/:id', req => db.users.findById(req.params.id))

RoutesHelper.POST(router, '/users/add', req => db.users.add(req.query))

RoutesHelper.PATCH(router, '/users/:id', req => db.users.edit(req.params.id, req))

RoutesHelper.DELETE(router, '/users', () => db.users.empty())
RoutesHelper.DELETE(router, '/users/:id', req => db.users.delete(req.params.id))

module.exports = router