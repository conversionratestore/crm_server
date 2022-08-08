const {Router} = require('express')
const router  = Router()
const config = require('config')
const db = require('../settings/db')

router.get('/', async (req, res, next) => {
    try {
        const clientsList = (await db.query('SELECT id, name FROM clients'))[0]
        res.status(200).json(clientsList)
    } catch (e) {
        next(e)
    }
})



module.exports = router