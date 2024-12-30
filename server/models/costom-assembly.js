const mongoose = require('mongoose');

const customAssemblySchema = new mongoose.Schema({
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
    
  }]
}, {
  timestamps: true 
});

const CustomAssembly = mongoose.model('CustomAssembly', customAssemblySchema);

module.exports = CustomAssembly;