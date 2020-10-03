function GET(router, url, handler) {
    router.get(url, async (req, res) => {
        try {
            const data = await handler(req)
            res.json({
                success: true,
                data: data
            })
        } catch (error) {
            res.json({
                success: false,
                data: {
                    error: true,
                    details: error.detail || error
                }

            })
        }
    })
}

function POST(router, url, handler) {
    router.post(url, async (req, res) => {
        try {
            const data = await handler(req)
            res.json({
                success: true,
                data: data
            })
        } catch (error) {
            console.info(error)
            res.json({
                success: false,
                data: {
                    error: true,
                    details: error.message || error.details || error
                }

            })
        }
    })
}

function PATCH(router, url, handler) {
    router.patch(url, async (req, res) => {
        try {
            let data = await handler(req)

            if (data.rowCount == 0) {
                throw new Error()
            }

            res.json({
                success: true,
                data: data
            })
        } catch (error) {
            res.json({
                success: false,
                data: {
                    error: true,
                    details: error.message || error.details || "There was not entry with id " + req.params.id
                }
            })
        }
    })
}

function DELETE(router, url, handler) {
    router.delete(url, async (req, res) => {
        try {
            let data = await handler(req)

            if (data.rowCount == 0) {
                throw new Error()
            }

            res.json({
                success: true
            })
        } catch (error) {
            res.json({
                success: false,
                data: {
                    error: true,
                    details: error.message || error.details || "There was not entry with id " + req.params.id
                }
            })
        }
    })
}

module.exports = {
    GET,
    POST,
    PATCH,
    DELETE
}