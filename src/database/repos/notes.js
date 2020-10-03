const { notes: sql } = require('../sql')
const columnSet = {}

class NotesRepository {
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

    async add(userId, title, description, dueDate) {
        return this.db.one(sql.add, {
            userId: userId,
            title: title,
            description: description,
            dueDate: dueDate
        })
    }

    // Removes a note by ID
    async delete(id) {
        return this.db.result(sql.delete, {id: id})
    }

    // Finds a note by ID
    async findById(id) {
        return this.db.oneOrNone(sql.findById, {id: id})
    }

    async getForUser(id) {
        return this.db.any(sql.getForUser, {userId: id})
    }
}

function createColumnSets(pgp) {
    if (!columnSet.insert) {
        const table = new pgp.helpers.TableName({table: 'notes', schema: 'public'})

        columnSet.insert = new pgp.helpers.ColumnSet(['name'], {table})
        columnSet.update = columnSet.insert.extend(['?id'])
    }

    return columnSet
}

module.exports = NotesRepository