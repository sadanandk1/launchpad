let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// Parcel Model
let parcelSchema = require('../models/Parcel');

// CREATE Parcel
router.route('/parcel').post((req, res, next) => {
  parcelSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
});

// READ Parcel
router.route('/parcel').get((req, res) => {
  let parcelSchema1 = require('../models/Parcel');

  parcelSchema1.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Single Parcel
router.route('/parcel/:id').get((req, res) => {
  let parcelSchema1 = require('../models/Parcel');
  parcelSchema1.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update Parcel
router.route('/parcel/:id').put((req, res, next) => {
  let parcelSchema1= require('../models/Parcel');
  parcelSchema1.findOneAndUpdate({'_id':req.params.id}, {
    $set: req.body
  }, {upsert: true}, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Parcel updated successfully !')
    }
  })
})

// Delete Parcel
router.route('/parcel/:id').delete((req, res, next) => {
  let parcelSchema1 = require('../models/Parcel');
  parcelSchema1.deleteOne({'_id':req.params.id}, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = router;
