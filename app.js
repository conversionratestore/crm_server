const express = require('express')
const config = require('config')
const app = express()

app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-requested-With, Content-Type, Accept, Authorization')

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})

app.use('/api/auth', require('./routes/auth'))
app.use('/api/post', require('./routes/post'))
app.use('/api/users', require('./routes/users'))

app.get('/', function (req, res) {
    res.status(200).send(`<h1>CRM API</h1>`);
});

app.use((err, req, res, next) => {
    res.status(500).json(err)
})
app.use((req, res) => {
    res.status(404).json({msg: '404 route not found'})
})

const PORT = config.get("port") || 4000

app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))