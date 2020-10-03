const promise = require('bluebird')
const pgPromise = require('pg-promise')
const dbConfig = require('../../config/db.config.json')
const { Users, Notes } = require('./repos')

const initOptions = {
    promiseLib: promise,
    error(err, e) {
      if (e.cn) {

      }
    },
    extend(obj) {
        obj.users = new Users(obj, pgp),
        obj.notes = new Notes(obj, pgp)
    }
}

const pgp = pgPromise(initOptions)
const db = pgp(dbConfig)

module.exports = { db, pgp }