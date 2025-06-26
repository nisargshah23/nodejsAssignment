const express = require('express');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.json());

app.post('/register',
  [
    body('role').notEmpty().withMessage('Role is required'),
    body('phone')
      .if((value, { req }) => req.body.role === 'admin')
      .notEmpty().withMessage('Phone number is required for admin')
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.json({ message: 'User registered successfully' });
  }
);

app.listen(3000, () => console.log('Server running on port 3000'));
