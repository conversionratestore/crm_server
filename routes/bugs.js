const {Router} = require('express')
const router  = Router()
const config = require('config')
const db = require('../settings/db')

//get bugs list

router.get('/', async (req, res, next) => {
    try {
        const status = req.query.status
        const clientsList = (await db.query(`SELECT * FROM bugs_listing WHERE status='${status}'`))[0]
        res.status(200).json(clientsList)
    } catch (e) {
        next(e)
    }
})

//add new bug report

router.post('/', async (req, res, next) => {
    try {
        const {client_id, test_name, created_by, summary, priority, device, os, browser, steps, actual_result, expected_result, links} = req.body
        const sql = 'INSERT INTO bugs (client_id, test_name, created_by, summary, priority, device, os, browser, steps, actual_result, expected_result, links) VALUES (?)'
        await db.query(sql, [[client_id, test_name, created_by, summary, priority, device, os, browser, steps, actual_result, expected_result, links]])
        res.status(201).json({status: "success", message: "Bug report created"})
    } catch (e) {
        next(e)
    }
})

//update bug report

router.post('/:id', async (req, res, next) => {
    try {

    } catch (e) {
        next(e)
    }
})




module.exports = router