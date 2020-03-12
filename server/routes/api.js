require('../data/database')
const express = require('express');
const router = express.Router();
const movieDBmodel = require('../model/movie');
const mongoose = require('mongoose');
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const jsonFile = require('jsonfile');


function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if (token === 'null') {
    return res.status(401).send('Unauthorized request')
  }
  let payload = jwt.verify(token, 'secretKey')
  if (!payload) {
    return res.status(401).send('Unauthorized request')
  }
  req.userId = payload.subject
  next()
}




var tempMovies = [];

router.get('/movies', verifyToken, (req, res) => {
  movieDBmodel.find({}, (err, data) => {
    err ? res.send(err) : tempMovies = (data);
    if (tempMovies.length < 1) {
      jsonFile.readFile('./data/data.json', (err, data) => {
        if (err) {
          console.log(err);
        }
        else {
          tempMovies.push(data);
          res.send(data);
        }
      })
    }
    else {
      res.send(tempMovies)
    }
  })
});

var tempCat = [];


router.get('/movies/caegories', verifyToken, (req, res) => {
  movieDBmodel.find({}, (err, data) => {
    err ? res.send(err) : tempCat = (data.map(ele => ele.category))
    var isDuplicate = tempCat.some(function (ele, idx) {
      return tempCat.indexOf(ele) != idx
    });
    res.send(tempCat);
  });

});



router.get('/movies/:category/', verifyToken, (req, res) => {
  movieDBmodel.find({ category: req.params.category }, (err, data) => {
    res.send(data);
  })
});


router.post('/movies', verifyToken, (req, res) => {
  new movieDBmodel(req.body).save().then(() => res.send({ data: `${req.body.name} posted` }))
})



router.put('/movies', verifyToken, (req, res) => {
  movieDBmodel.findOneAndUpdate({ id: req.body.param }, { $set: { [req.body.oldParam]: req.body.newParam } }, (err, doc) => {
    err ? console.log(err) : res.send(doc)
  })
})

router.delete('/movies/delete/:id', verifyToken, (req, res) => {
  movieDBmodel.findOneAndDelete({ _id: mongoose.Types.ObjectId(req.params.id) }, (err) => {
    err ? console.log(err) : res.send(`PRODUCT ${req.body.id} deleted`)
  })
})




router.post('/register', (req, res) => {
  let userData = req.body
  let user = new User(userData)
  user.save((err, registeredUser) => {
    if (err) {
      console.log(err)
    } else {
      let payload = { subject: registeredUser._id }
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({ token })
    }
  })
})

router.post('/login', (req, res) => {
  let userData = req.body;
  User.findOne({ username: userData.username }, (err, user) => {
    if (err) {
      console.log(err)
    } else {
      if (!user) {
        res.status(401).send('Invalid userName')
      } else
        if (user.password !== userData.password) {
          res.status(401).send('Invalid Password')
        } else {
          let payload = { subject: user._id }
          let token = jwt.sign(payload, 'secretKey')
          res.status(200).send({ token })
        }
    }
  })
})

module.exports = router;
