const { notes: sql } = require('../sql')
const columnSet = {}

class NotesRepository {
    constructor(db, pgp) {
        this.db = db
        this.pgp = pgp

        createColumnSets(pgp)
    }

    // Creates the notes table
    async create() {
        return this.db.none(sql.create)
    }

    // Drops the table
    async drop() {
        return this.db.none(sql.drop)
    }

    // Removes all records from the table
    async empty() {
        return this.db.result(sql.empty)
    }

    // Adds a note
    async add(query) {
        return this.db.one(sql.add, {
            userId: query.userId,
            title: query.title,
            description: query.description,
            dueDate: query.dueDate
        })
    }

    // Edits a note
    async edit(id, query) {
        let data = await this.db.oneOrNone(sql.find, {id: id})

        return this.db.one(sql.edit, {
            id: id,
            title: query.title || data.title,
            description: query.description || data.description,
            dueDate: query.dueDate || data.dueDate
        })
    }

    async setDone(id) {
        return this.db.oneOrNone(sql.setDone, {id: id})
    }

    // Removes a note
    async delete(id) {
        return this.db.result(sql.delete, {id: id})
    }

    // Finds a note
    async find(id) {
        return this.db.oneOrNone(sql.find, {id: id})
    }

    // Gets all notes for user
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