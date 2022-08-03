const express = require('express')
const config = require('config')
const app = express()
const verify = require('./middleware/check-auth')

app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-requested-With, Content-Type, Accept, Authorization, crs-auth-token')

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})
// global routs
app.use('/auth', require('./routes/auth'))
app.get('/', function (req, res) {
    res.status(200).send(`<h1>CRM API</h1>`);
});

//private routs
app.use(verify)
app.use('/post', require('./routes/post'))
app.use('/users', require('./routes/users'))
app.use('/clients', require('./routes/clients'))
app.use('/bugs', require('./routes/bugs'))

app.use((err, req, res, next) => {
    res.status(500).json({ss: "error", msg: err.message, err})
})
app.use((req, res) => {
    res.status(404).json({ss: "error", msg: '404 route not found'})
})

const PORT = config.get("port") || 4000

app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))