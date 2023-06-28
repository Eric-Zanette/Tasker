/* packages */
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')

/* routes */
const users = require('./routes/api/users')
const tasks = require('./routes/api/tasks')

/* initialize express */
const app = express()


/* Parser middleware */

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

/* Bring in mongo key */
const mkey = (require('./config/keys')).mongoURI

mongoose
    .connect(mkey)
    .then(() => console.log('mongo DB connected'))
    .catch((error) => console.log(error))



app.use('/api/users', users)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port}`))