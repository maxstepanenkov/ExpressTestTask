const Router = require('express');
const Client = require('../models/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, checkSchema, validationResult } = require('express-validator');
const router = new Router();
const authMiddleware = require('../middleware/auth.middleware');
const rolesSchema = require('../validations/signUp.validation');

router.post('/registration', 
  [
    check('email', 'Uncorrect email').isEmail(),
    check('password', 'Password must be longer than 4 and shorter than 15').isLength({
      min: 4,
      max: 15,
    }),
    checkSchema(rolesSchema)
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Uncorrect request", errors })
      };
      const { email, password, role } = req.body;
      const candidate = await Client.findOne({ email });
      if (candidate) {
        return res.status(400).json({ message: `Client with email ${email} already exist` })
      }
      const hashPassword = await bcrypt.hash(password, 8);
      const client = new Client({ email, password: hashPassword, role });
      await client.save();
      res.json({ massage: 'User was created' });
    } catch(e) {
      next(e);
    }
});

router.post('/login',
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const client = await Client.findOne({ email });
      if (!client) {
        return res.status(404).json({ message: 'Client not find' });
      }
      const isPassValid = bcrypt.compareSync(password, client.password);
      if (!isPassValid) {
        return res.status(400).json({ message: 'Invalid password' });
      }
      const token = jwt.sign({ id: client.id, role: client.role }, process.env.SECRET_KEY, { expiresIn: '2d' });
      return res.json({
        token,
        client: {
          id: client.id,
          email: client.email,
          role: client.role
        }
      });
    } catch(e) {
      next(e);
    }
  }
);

module.exports = router