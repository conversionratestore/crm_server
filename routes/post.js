const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.json({message: "Secret data"})
})

module.exports = router