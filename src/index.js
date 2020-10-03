let express = require('express')
let app = express()

// Serving static files
app.use(express.static('public'))

// Defining the port (either from environment or 3000 as default)
const PORT = process.env.PORT || 3000

// Starting the server
app.listen(PORT, () => console.info(`Server has started on port ${PORT}`))