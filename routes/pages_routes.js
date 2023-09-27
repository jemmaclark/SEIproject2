
const express = require('express')
const router = express.Router()
const db = require('../db')


router.get('/', (req, res) => {

    db.query('SELECT * FROM dishes;', (err, dbRes) => {
        let dishes = dbRes.rows
        console.log(req.session.userId)
        res.render('home', { dishes: dishes })

    })
})

router.get('/about', (req, res) => {
    res.render('about')
})


module.exports = router