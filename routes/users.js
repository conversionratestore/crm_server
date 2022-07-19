const {Router} = require('express')
const router = Router()
const db = require('../settings/db')

router.get('/', (req, res, next) => {
        db.query('SELECT * FROM `users`', (error, rows, fields) => {
            if(error) {
                next(error)
            } else {
                console.log(rows)
            }
        })
})

module.exports = router