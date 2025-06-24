 const jwt = require('jsonwebtoken');

exports.loginAdmin = (req, res) => {
  const { email, password } = req.body;

  // Dummy credentials — replace with DB or secure method if needed
  if (email === 'admin@volunteer.org' && password === 'admin123') {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ success: true, token });
  }

  res.status(401).json({ success: false, message: 'Invalid credentials' });
};

