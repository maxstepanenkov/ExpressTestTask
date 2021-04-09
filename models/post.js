const { model, Schema, ObjectId } = require('mongoose');

const Post = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
}, {
  timestamps: true
});

module.exports = model('Post', Post);
