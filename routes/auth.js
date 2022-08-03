const {Router} = require('express')
const router  = Router()
const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {body, validationResult} = require('express-validator')
const db = require('../settings/db')

router.post('/registration',
    [
        body('email').isEmail(),
        body('pwd').isLength({ min:8 })
    ],
    async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({validation_error: errors.array()})
        }
        const {email, pwd} = req.body
        let newUser = true
        const answer = (await db.query(`SELECT id FROM users WHERE email='${email}'`))[0]
        if (answer.length > 0) {
            newUser = false
        }
        if(newUser) {
            const hashedPassword = await bcrypt.hash(pwd, config.get("salt"))
            const user = (await db.query(`INSERT INTO users(email, password) VALUES (?) ;`, [[email, hashedPassword]]))[0]
            res.status(201).json({status: "success", message: "User created"})
        } else  {
            res.status(401).json({status:"error", message: "User with this email already created"})
        }
    } catch (e) {
        next(e)
    }

})

router.post('/login', async (req, res, next) => {
    try {
        const {email, pwd} = req.body
        let checkUser = false
        const answer = (await db.query(`SELECT * FROM users WHERE email='${email}'`))[0]
        if(answer.length > 0) {
            checkUser = true
        }

        if(!checkUser) {
            return res.status(401).json({status: 'error', message: 'Email or password is incorrect'})
        }

        const match = await bcrypt.compare(pwd, answer[0].password);

        if(match) {
            const token = jwt.sign({id: answer[0].id, role: answer[0].role}, config.get("keyjwt"))
            res.status(200).json({name: answer[0].name, role: answer[0].role, token, status: "success", message:"You are logged in"})
        } else {
            return res.status(401).json({status: "error", message: 'Email or password is incorrect'})
        }

    } catch (e) {
        next(e)
    }
})

module.exports = router