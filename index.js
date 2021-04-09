require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.API_PORT;
const authRouter = require('./routes/auth.routes');
const postRouter = require('./routes/post.routes');
const orderRouter = require('./routes/order.routes');

app.use(cors());
app.use(express.json());
app.use(express.static('static'));
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/orders', orderRouter);
app.use(function(err, req, res, next) {
  console.log(err);
  next();
})

const bootstrap = async () => {
  try {
    console.log(process.env.DB_NAME)
    await mongoose.connect(`${process.env.DB_HOST}${process.env.DB_NAME}?authSource=admin`);

    app.listen(PORT, () => {
      console.log(`Server has been started on port: ${PORT}`);
    })
  } catch(e) {
    console.log(e);
  }
}

bootstrap();