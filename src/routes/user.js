let express = require('express')
let router = express.Router()

router.get('/users', (req, res) => {
    res.send('You have requested all users')
})

router.get('/user/:id', (req, res) => {
    res.send(`You have requested a user with the id ${req.params.id}`)
})

module.exports = router