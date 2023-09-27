// another station to check the userId to see wether a user is logged in
// create a user object by fetching data recorded from the database and make it easy for us to access everywhere.

const db = require('../db/index.js')

function setCurrentUser(req, res, next) {
    // we use res.locals when we want to make available values in every template
    res.locals.userId = req.session.userId

    if (!req.session.userId) {
        return next()
    }
    // all we have is just the id - we need to fetch from db
    const sql = `SELECT * FROM users WHERE id = $1;`
    
    db.query(sql, [req.session.userId], (err, dbRes) => {
        if (err) {
            console.log(err)
            process.exit(1) // stop the process
        } else {
            // user is logged in because session has the userId set
            // making it easy to access user everywhere
            const user = dbRes.rows[0]
            res.locals.user = user
        }

        next()
    })
}
module.exports = setCurrentUser