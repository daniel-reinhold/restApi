let express = require('express')
let router = express.Router()

router.get('/notes', (req, res) => {
    res.send('You have requested all notes')
})

router.get('/note/:id', (req, res) => {
    res.send(`You have requested a note with the id ${req.params.id}`)
})

module.exports = router