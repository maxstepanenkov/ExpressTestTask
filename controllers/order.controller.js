const Order = require('../models/order');
const RELATIONSHIP = require('../constants/relationship');

class OrderController {
  async create(req, res, next) {
    try {
      const { title, list } = req.body;
      const { user } = req;
      const order = new Order({ title, list, client: user.id });
      await order.save();
      return res.json(order);
    } catch(e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const { id, client } = req.query;
      if (id) {
        const order = await Order.findById(id).populate(RELATIONSHIP.client);
        res.json(order);
      } else if (client) {
        const order = await Order.find({ client }).populate(RELATIONSHIP.client);
        res.json(order);
      } else {
        const orders = await Order.find().populate(RELATIONSHIP.client);
        res.json(orders);
      }
    } catch(e) {
      next(e);
    }
  }

  async updateById(req, res, next) {
    try {
      const { id } = req.query;
      const { body } = req;
      const order = await Order.findByIdAndUpdate(id, body);
      res.json(order);
    } catch(e) {
      next(e);
    }
  }

  async removeById(req, res, next) {
    try {
      const { id } = req.query;
      const order = await Order.findByIdAndRemove(id);
      res.json(order);
    } catch(e) {
      next(e);
    }
  }
}

module.exports = new OrderController();