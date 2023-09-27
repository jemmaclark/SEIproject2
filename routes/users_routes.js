const express = require('express')
const router = express.Router()
const db = require('../db')
const bcrypt = require('bcrypt')


router.get('/signup', (req, res) => {
    res.render('signup')
})

router.post('/users', (req, res) => {
    const { email, password } = req.body;
    const saltRounds = 10;

    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
            console.log("Error hashing password:", err);
        }

        const sql = `INSERT INTO users (email, password_digest) VALUES ($1, $2)`;

        db.query(sql, [email, hashedPassword], (error, results) => {
            if (error) {
                console.log("Error inserting user:", error);
            }

            res.redirect('/login');
        });
    });
});




module.exports = router