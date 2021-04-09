const { model, Schema, ObjectId } = require('mongoose');

const Client = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['ADMIN', 'USER']
  }
});

module.exports = model('Client', Client);
