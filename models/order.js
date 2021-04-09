const { model, Schema, ObjectId } = require('mongoose');

const Order = new Schema({
  title: {
    type: String,
    required: true,
  },
  list: [String],
  client: {
    type: ObjectId,
    ref: 'Client'
  }
}, { timestamps: true });

module.exports = model('Order', Order);