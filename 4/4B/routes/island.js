const dbConnection = require('../connection/db')
const uploadFile = require("../middlewares/uploadFile")
const router = require('express').Router()
// const fs = require('fs')
// const path = require('path')

router.get('/province/detail/:id', function(req, res) {
    const {id} = req.params
    const query = `
    SELECT * FROM provinsi_tb
    WHERE id = ?
    `

    dbConnection.getConnection((err, conn) => {
        if (err) throw err

        conn.query(query, [id], (err, results) => {
            if (err) throw err

            const island = []
            for (let result of results) {
                island.push({...result})
            }

            const detailId = req.params.id

            res.render('island/detail-province', {title: 'All you want to know', island, detailId})
        })

        conn.release()
    })
})

router.get('/district/detail/:id', function(req, res) {
    const {id} = req.params
    const query = `
    SELECT * FROM kabupaten_tb
    WHERE id = ?
    `

    dbConnection.getConnection((err, conn) => {
        if (err) throw err

        conn.query(query, [id], (err, results) => {
            if (err) throw err

            const island = []
            for (let result of results) {
                island.push({...result})
            }

            const detailId = req.params.id

            res.render('island/detail-district', {title: 'All you want to know', island, detailId})
        })

        conn.release()
    })
})

router.get('/add-province', function(req, res) {
    res.render('island/add-province', {title: 'Add data of province'})
})

router.post('/add-province', uploadFile("image"), function(req, res) {
    const {name, inaugurated, island} = req.body
    let image = req.file.filename

    const query = `
    INSERT INTO provinsi_tb (nama, diresmikan, photo, pulau) 
    VALUES (?,?,?,?)
    `

    dbConnection.getConnection((err, conn) => {
        if (err) throw err

        conn.query(query, [name, inaugurated, image, island], (err, results) => {
            if (err) throw err

            res.redirect('/')
        })

        conn.release()
    })
})

router.get('/add-district', function(req, res) {
    const query = 'SELECT id, nama FROM provinsi_tb'

    dbConnection.getConnection((err, conn) => {
        if (err) throw err

        conn.query(query, (err, results) => {
            if (err) throw err

            const provinces = []
            for (let result of results) {
                provinces.push({...result})
            }

            res.render('island/add-district', {title: 'Add data of district', provinces})
        })

        conn.release()
    })
})

router.post('/add-district', uploadFile("image"), function(req, res) {
    const {name, provinceId, inaugurated} = req.body
    let image = req.file.filename
    console.log(req.file);

    const query = `
    INSERT INTO kabupaten_tb (nama, provinsi_id, diresmikan, photo) 
    VALUES (?,?,?,?)
    `

    dbConnection.getConnection((err, conn) => {
        if (err) throw err

        conn.query(query, [name, provinceId, inaugurated, image], (err, results) => {
            if (err) throw err

            res.redirect('/')
        })

        conn.release()
    })
})

router.get('/province/delete/:id', function(req, res) {
    const {id} = req.params
    console.log(req.file);

    const query = `DELETE FROM provinsi_tb WHERE id = ?`

    dbConnection.getConnection((err, conn) => {
        if (err) throw err

        conn.query(query, [id], (err, results) => {
            if (err) throw err


            res.redirect('/')
        })

        conn.release()
    })
})

router.get('/province/update/:id', function(req, res) {
    const {id} = req.params
    const query = 'SELECT * FROM provinsi_tb WHERE id = ?'

    dbConnection.getConnection((err, conn) => {
        if (err) throw err

        conn.query(query, [id], (err, results) => {
            if (err) throw err

            const provinces = []
            for (let result of results) {
                provinces.push({...result})
            }

            res.render('island/update-province', {title: 'Add data of district', provinces, id})
        })

        conn.release()
    })
})

router.post('/province/update/:id', uploadFile("image"), function(req, res) {
    const {id} = req.params
    const {name, inaugurated, island} = req.body
    const image = req.file.filename
    const query = `
    UPDATE provinsi_tb
    SET nama = ?, diresmikan = ?, photo = ?, pulau = ?
    WHERE id = ?
    `

    dbConnection.getConnection((err, conn) => {
        if (err) throw err

        conn.query(query, [name, inaugurated, image, island, id], (err, results) => {
            if (err) throw err

            res.redirect('/')
        })

        conn.release()
    })
})

router.get('/district/delete/:id', function(req, res) {
    const {id} = req.params
    console.log(req.file);

    const query = `DELETE FROM kabupaten_tb WHERE id = ?`

    dbConnection.getConnection((err, conn) => {
        if (err) throw err

        conn.query(query, [id], (err, results) => {
            if (err) throw err

            res.redirect('/')
        })

        conn.release()
    })
})

router.get('/district/update/:id', function(req, res) {
    const {id} = req.params
    const query = 'SELECT * FROM kabupaten_tb WHERE id = ?'

    dbConnection.getConnection((err, conn) => {
        if (err) throw err

        conn.query(query, [id], (err, results) => {
            if (err) throw err

            const provinces = []
            for (let result of results) {
                provinces.push({...result})
            }

            res.render('island/update-district', {title: 'Add data of district', provinces, id})
        })

        conn.release()
    })
})

router.post('/district/update/:id', uploadFile("image"), function(req, res) {
    const {id} = req.params
    const {name, inaugurated} = req.body
    const image = req.file.filename
    const query = `
    UPDATE kabupaten_tb
    SET nama = ?, diresmikan = ?, photo = ?
    WHERE id = ?
    `

    dbConnection.getConnection((err, conn) => {
        if (err) throw err

        conn.query(query, [name, inaugurated, image, id], (err, results) => {
            if (err) throw err

            res.redirect('/')
        })

        conn.release()
    })
})

module.exports = router