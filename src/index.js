let express = require('express')
let app = express()
let path = require('path')

let userRoutes = require('./routes/user')
let noteRoutes = require('./routes/note')

// Logging each request
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`)
    next()
})

// Registering routes
app.use(userRoutes)
app.use(noteRoutes)

// Serving static files
app.use(express.static('public'))

// Handles HTTP 404 (Page not found)
app.use(((req, res, next) => {
    res.status(404).send('The page you were looking for doesn\'t exists')
}))

// Handles HTTP 500 (Internal server error)
app.use((err, req, res, next) => {
    console.error(err)
    res.sendFile(path.join(__dirname, '../public/500.html'))
})

// Defining the port (either from environment or 3000 as default)
const PORT = process.env.PORT || 3000

// Starting the server
app.listen(PORT, () => console.info(`Server has started on port ${PORT}`))