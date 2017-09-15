let express = require('express')
let bodyParser = require('body-parser')
let path = require('path')
let expressValidator = require('express-validator')
let mongojs = require('mongojs')
let db = mongojs('mycustomers', ['customers'])
let ObjectId = mongojs.ObjectId

let port = 1234

let app = express()
/*
 let logger = function (req, res, next) {
 console.log('Logging...')
 next()
 }
 app.use(logger) */

//set view Engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//BodyParser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//Set static Path
app.use(express.static(path.join(__dirname, 'public')))

app.use(function (req, res, next) {
  res.locals.errors = null
  next()
})

//Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    let namespace = param.split('.')
      ,root = namespace.shift()
      ,formParam = root
    while (namespace.length){
      formParam += '[' + namespace.shift() + ']'
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    }
  }
}))

app.get('/', (req, res) => {
  db.customers.find(function (err, docs) {
    res.render('index', {
      title: 'Customers',
      users: docs
    })
  })
})

app.post('/users/add', (req, res) => {
  req.checkBody('first_name', 'First Name is required').notEmpty()
  req.checkBody('last_name', 'Last Name is required').notEmpty()
  req.checkBody('gender', 'Gender is required').notEmpty()

  let errors = req.validationErrors()
  console.log(errors)
  if(errors){
    res.render('index', {
      title: 'Customers',
      errors: errors
    })
  }else {
    let newCustomer = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      gender: req.body.gender
    }
    db.customers.insert(newCustomer, (err, result) => {
      if(err){
        console.log(err)
      }
      res.redirect('/')
    })
  }
})

app.delete('/users/delete/:id', (req, res) => {
 db.customers.remove({_id: ObjectId(req.params.id)}, (err) => {
   if(err) console.log(err)
   res.redirect('/')
 })
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})

