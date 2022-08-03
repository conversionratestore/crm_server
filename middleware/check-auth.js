const {verify} = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    try {
        const token = req.headers['crs-auth-token']
        if(!token) return res.status(401).json({status: "error", message: "Access denied"})
        req.userData = verify(token, config.get('keyjwt'))
        next()
    } catch (e) {
        return res.status(401).json({status: "error", message: 'Auth failed'})
    }
}