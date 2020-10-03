let express = require('express')
const { db } = require('../database')
const superAdmin = require('../../config/db.superadmin.config.json')
const url = require('url')

let router = express.Router()

router.get('/db/init', async (req, res) => {
    db.users.create()
        .then(() => console.info('Created table users'))
        .catch((error) => console.error(error.message))

    db.notes.create()
        .then(() => console.info('Created table notes'))
        .catch((error) => console.error(error.message))

    db.users.add(superAdmin['username'], superAdmin['email'], superAdmin['password'], superAdmin['admin'])
        .then(() => console.info('Created super administrator'))
        .catch((error) => console.error(error.message))

    res.redirect(url.format({
        pathname: '/',
        query: {
            notificationMessage: 'Database has been initialized successfully',
            notificationType: 'INFO'
        }
    }))
})

module.exports = router