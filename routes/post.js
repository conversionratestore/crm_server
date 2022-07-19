const {Router} = require('express')
const router = Router()
const verify = require('../middleware/check-auth')

router.get('/', verify, (req, res) => {
    res.json({message: "Secret data"})
})

module.exports = router