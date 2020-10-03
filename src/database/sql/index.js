const { QueryFile } = require('pg-promise')
const {join: joinPath} = require('path')

module.exports = {
    users: {
        create: sql('users/create.sql'),
        add: sql('users/add.sql'),
        delete: sql('users/delete.sql'),
        selectAll: sql('users/selectAll.sql'),
        amountOfUsers: sql('users/totalAmount.sql'),
        findById: sql('users/findById.sql'),
        findByUsername: sql('users/findByUsername.sql'),
        drop: sql('users/drop.sql')
    },
    notes: {
        create: sql('notes/create.sql'),
        drop: sql('notes/drop.sql'),
        add: sql('notes/add.sql'),
        remove: sql('notes/delete.sql'),
        findById: sql('notes/findById.sql'),
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