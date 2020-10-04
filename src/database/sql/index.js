const { QueryFile } = require('pg-promise')
const {join: joinPath} = require('path')

module.exports = {
    users: {
        create: sql('users/create.sql'),
        add: sql('users/add.sql'),
        edit: sql('users/edit.sql'),
        delete: sql('users/delete.sql'),
        empty: sql('users/empty.sql'),
        selectAll: sql('users/selectAll.sql'),
        find: sql('users/find.sql')
    },
    notes: {
        create: sql('notes/create.sql'),
        empty: sql('notes/empty.sql'),
        add: sql('notes/add.sql'),
        edit: sql('notes/edit.sql'),
        delete: sql('notes/delete.sql'),
        find: sql('notes/find.sql'),
        getForUser: sql('notes/getForUser.sql')
    }
}

function sql(file) {
    // Generates the full path of file
    const fullPath = joinPath(__dirname, file)

    const options = { minify: true }
    const queryFile = new QueryFile(fullPath, options)

    if (queryFile.error) {
        console.error(queryFile.error)
    }

    return queryFile
}