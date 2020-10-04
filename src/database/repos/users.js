const { users: sql } = require('../sql')
const columnSet = {}

class UsersRepository {
    constructor(db, pgp) {
        this.db = db
        this.pgp = pgp

        createColumnSets(pgp)
    }

    // Creates the users table
    async create() {
        return this.db.none(sql.create)
    }

    // Removes all records from the table
    async empty() {
        return this.db.result(sql.empty)
    }

    // Adds a user
    async add(query) {
        return this.db.one(sql.add, {
            username: query.username,
            email: query.email,
            password: query.password,
            admin: query.admin === 'true'
        })
    }

    // Edits a user
    async edit(id, query) {
        let data = await this.db.oneOrNone(sql.find, {id: id})

        return this.db.one(sql.edit, {
            userId: id,
            username: query.username || data.username,
            email: query.email || data.email,
            password: query.password || data.password,
            admin: query.admin === 'true' || data.admin
        })
    }

    // Removes a user
    async delete(id) {
        return this.db.result(sql.delete, {id: id})
    }

    // Finds a user
    async find(id) {
        return this.db.oneOrNone(sql.find, {id: id})
    }

    // Returns all Users
    async all() {
        return this.db.any(sql.selectAll)
    }
}

function createColumnSets(pgp) {
    if (!columnSet.insert) {
        const table = new pgp.helpers.TableName({table: 'users', schema: 'public'})

        columnSet.insert = new pgp.helpers.ColumnSet(['name'], {table})
        columnSet.update = columnSet.insert.extend(['?id'])
    }

    return columnSet
}

module.exports = UsersRepository