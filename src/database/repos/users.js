const { users: sql } = require('../sql')
const columnSet = {}

class UsersRepository {
    constructor(db, pgp) {
        this.db = db
        this.pgp = pgp

        createColumnSets(pgp)
    }

    // Creates the table
    async create() {
        return this.db.none(sql.create)
    }

    // Drops the table
    async drop() {
        return this.db.none(sql.drop)
    }

    // Removes all records from the table
    async empty() {
        return this.db.none(sql.empty)
    }

    async add(username, email, password, admin) {
        return this.db.one(sql.add, {
            username: username,
            email: email,
            password: password,
            admin: admin
        })
    }

    // Removes a uses by ID
    async delete(id) {
        return this.db.result(sql.delete, {id: id})
    }

    // Finds a user by ID
    async findById(id) {
        return this.db.oneOrNone(sql.findById, {id: id})
    }

    // Finds a user by username
    async findByUsername(username) {
        return this.db.oneOrNone(sql.findByUsername, {username: username})
    }

    // Returns all Users
    async all() {
        return this.db.any(sql.selectAll)
    }

    // Returns the total amount of users
    async totalAmount() {
        return this.db.one(sql.amountOfUsers)
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