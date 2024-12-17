const mongoose = require('mongoose');

const customPrototypeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  type: {
    type: String, 
    required: true
  },
  data: [{
    type: {
      type: String, 
      required: true
    },
    cost: {
      type: Number, 
      required: true
    },
    // _id: { type: mongoose.Schema.Types.ObjectId }
  }]
}, {
  timestamps: true 
});

const CustomPrototype = mongoose.model('CustomPrototype', customPrototypeSchema);

module.exports = CustomPrototype;
