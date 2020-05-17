const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let parcelSchema = new Schema({
  name: {
    type: String
  },
  metric: {
    type: String
  },
  size: {
    type: Number
  }
}, {
    collection: 'landParcel'
  })

module.exports = mongoose.model('Parcel', parcelSchema)