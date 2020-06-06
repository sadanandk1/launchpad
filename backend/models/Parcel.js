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
  }, {
    writeConcern: {
      w: 'majority',
      j: true,
      wtimeout: 1000
    }
  })

module.exports = mongoose.model('Parcel', parcelSchema)