const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const User = require('../models/user')

const mongoose = require('mongoose')
const dbUrl = 'mongodb://localhost:27017/eventDB'

mongoose.connect(dbUrl, err => {
  if(err) console.log('error')
  else console.log('connect db success')
})

function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorization request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') {
    return res.status(401).send('Unauthorization request')
  }
  let payload = jwt.verify(token, 'love you')
  if(!payload) {
    return res.status(401).send('Unauthorization request')
  }
  req.userId = payload.subject
  next()
}

router.get('/', (req, res) => {
  res.send('from API route')
})

router.post('/register', (req, res) => {
  let userData = req.body
  let user = new User(userData)
  user.save((err, registereduser) => {
    if(err) console.log('error')
    else {
      let payload = { subject: registereduser._id }
      let token = jwt.sign(payload, 'love you')
      res.status(200).send({token})
      // res.status(200).send(registereduser)
    }
  })
})

router.post('/login', (req, res) => {
  let userData = req.body

  User.findOne({email: userData.email}, (err, user) => {
    if(err) console.log('err')
    else {
      if(!user) res.status(401).send('Invalid email')
      else{
        if(user.password !== userData.password) res.status(401).send('Invalid password')
        else {
          let payload = { subject: user._id }
          let token = jwt.sign(payload, 'love you')
          res.status(200).send({token})
          // res. status(200).send(user)
        }
      }
    }
  })
})

router.get('/events', (req, res) => {
  let events = [
    {
      "_id": "1",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "4",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "5",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "6",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ]
  res.json(events)
})

router.get('/special', verifyToken, (req, res) => {
  let specialEvents = [
    {
      "_id": "1",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "4",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "5",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "6",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ]
  res.json(specialEvents)
})

module.exports = router