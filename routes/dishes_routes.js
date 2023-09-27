
const express = require('express')
const router = express.Router()
const db = require('../db')
const ensureLoggedIn = require('../middlewears/ensure_logged_in')

router.get('/new', ensureLoggedIn, (req, res) => {

    res.render('new_form')

})

router.post('/', ensureLoggedIn, (req, res) => {


    let title = req.body.title
    let imageUrl = req.body.image_url

    // insert a new dish into the dishes table
    const sql = `INSERT INTO dishes (title, image_url, user_id) VALUES ($1, $2, $3);`
   
    db.query(sql, [title, imageUrl, req.session.userId], (err, dbRes) => {
        if (err) {
            console.log(err)
        }

        // res.send('thank you for making me rich...')
        res.redirect('/')
    })
})

router.delete('/:id', ensureLoggedIn, (req, res) => { 
    console.log(req.params)

    db.query(`DELETE FROM dishes WHERE id = ${req.params.id};`, (err, dbRes) => {
        if (err) {
            console.log(err);
        }

        res.redirect('/')
    })
})

router.get('/:id', (req, res) => {

    // const sql = `SELECT * FROM dishes WHERE id = ${req.params.id};`
    const sql = `SELECT * FROM dishes WHERE id = $1`
    const values = [req.params.id]

    console.log(req.query.title)

    db.query(sql, values, (err, dbRes) => {
        
        if (err) {
            console.log(err)
        }


        let dish = dbRes.rows[0]

        res.render('show', { dish })
    })
   
})

router.get('/:id/edit', (req, res) => {


    let dishId = req.params.id
    let sql = `SELECT * FROM dishes WHERE id = ${dishId}`;

    db.query(sql, (err, dbRes) => {
        if (err) {
            console.log(err);
        }

        let dish = dbRes.rows[0]
        res.render('edit_form', { dish })

    })

})

router.put('/:id', (req, res) => {
    
    const sql = `
    UPDATE dishes
    SET title = '${req.body.title}', image_url = '${req.body.image_url}'
    WHERE id = ${req.params.id};
    ` 

        db.query(sql, (err, dbRes) => {
            if (err) {
            console.log(err);
             }


            res.redirect(`/dishes/${req.params.id}`)
                   
    })
    
})

module.exports = router