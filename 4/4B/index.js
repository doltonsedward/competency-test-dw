const http = require('http')
const express = require('express')
const path = require('path')
const session = require('express-session')
const flash = require('express-flash')

const app = express()
const hbs = require('hbs')

const dbConnection = require('./connection/db')

app.use("/static", express.static(path.join(__dirname, "/public")))
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

app.use(express.urlencoded({ extended: false }));

app.set("views", path.join(__dirname, "views"))

app.set("view engine", "hbs")

const islandRoute = require('./routes/island') 

hbs.registerPartials(path.join(__dirname, '/views/partials'))

// user session
app.use(
  session({
    cookie: {
      maxAge: 7200000,
      secure: false,
      httpOnly: true,
    },
    store: new session.MemoryStore(),
    saveUninitialized: true,
    resave: false,
    secret: "secretValue",
  })
);

// use flash for sending message
app.use(flash())

// set up flash
app.use((req, res, next) => {
  res.locals.message = req.session.message
  delete req.session.message
  next()
})

app.get('/', (req, res) => {
    const query = 'SELECT * FROM provinsi_tb ORDER BY id'

    dbConnection.getConnection((err, conn) => {
      if (err) throw err

      conn.query(query, (err, results) => {
        if (err) throw err
        
        const provinces = []
        for (let result of results) {
          provinces.push({...result})
        }
        
        res.render("index", {title: 'Catatan Penduduk', provinces})
      })

      conn.release()
    })
})

app.post('/search', (req, res) => {
  const {option} = req.body
  
  if (option === 'provinsi') {
    res.redirect('/search/province')
    return
  } else {
    res.redirect('/search/district')
    return
  }
})

app.get('/search/province', (req, res) => {
  const query = `SELECT * FROM provinsi_tb`

  dbConnection.getConnection((err, conn) => {
    if (err) throw err

    conn.query(query, (err, results) => {
      if (err) throw err
      
      const provinces = []
      for (let result of results) {
        provinces.push({...result})
      }

      res.render("island/search-province", {title: 'Catatan Penduduk', provinces})
    })

    conn.release()
  })
})

app.get('/search/district', (req, res) => {
  const query = `SELECT * FROM kabupaten_tb`

  dbConnection.getConnection((err, conn) => {
    if (err) throw err

    conn.query(query, (err, results) => {
      if (err) throw err
      
      const districts = []
      for (let result of results) {
        districts.push({...result})
      }

      res.render("island/search-district", {title: 'Catatan Penduduk', districts})
    })

    conn.release()
  })
})

app.use('/pulau', islandRoute)

const server = http.createServer(app)
const port = 5000
server.listen(port, () => {
    console.log(`Server sedang berjalan pada http://localhost:${port}`)
})
