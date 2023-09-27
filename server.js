// fnd the .env file and load the variables defined as environment variables
require('dotenv').config()

const express = require('express')
const requestLogger = require('./middlewears/request_logger')
const expressLayouts = require('express-ejs-layouts')
const reqBodyMethodOverride = require('./middlewears/req_body_method_override')
const session = require('express-session')
const setCurrentUser = require('./middlewears/set_current_user')

const dishesRoutes = require('./routes/dishes_routes')
const sessionsRoutes = require('./routes/sessions_routes')
const pagesRoutes = require('./routes/pages_routes')
const usersRoutes = require('./routes/users_routes')

const port = process.env.PORT || 8080
const app = express()

app.set('view engine', 'ejs')

// Middlewares ================================

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(reqBodyMethodOverride)
app.use(session({
      secret: process.env.SESSION_SECRET || "mistyrose",
      resave: false,
      saveUninitialized: true,
    })
  );
app.use(setCurrentUser)
app.use(requestLogger)
app.use(expressLayouts)

// Routes ====================================

app.use('/', pagesRoutes)

app.use('/dishes', dishesRoutes)

app.use('/', sessionsRoutes)

app.use('/', usersRoutes)

app.listen(port, () => {

    console.log(`server listening on port ${port}`);
    
})