 const verifyToken = require('./middleware/auth');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const volunteerSchema = new mongoose.Schema({
  name: String,
  email: String,
  skills: String
});

const needSchema = new mongoose.Schema({
  title: String,
  skills: [String],
  date: String
});

const Volunteer = mongoose.model('Volunteer', volunteerSchema);
const Need = mongoose.model('Need', needSchema);

app.post('/register', async (req, res) => {
  const { name, email, skills } = req.body;
  if (!name || !email || !skills) return res.status(400).json({ message: 'All fields are required.' });
  try {
    await Volunteer.create({ name, email, skills });
    res.status(200).json({ message: 'Volunteer registered successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Database error' });
  }
});

app.get('/volunteers', async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ message: 'Database error' });
  }
});

app.delete('/volunteers/:id', async (req, res) => {
  try {
    await Volunteer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Volunteer deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Database error' });
  }
});

app.get('/needs', async (req, res) => {
  try {
    const needs = await Need.find();
    res.json(needs);
  } catch (err) {
    res.status(500).json({ message: 'Database error' });
  }
});

app.post('/needs', async (req, res) => {
  const { title, skills, date } = req.body;
  if (!title || !skills || !date) return res.status(400).json({ message: 'All fields are required.' });
  try {
    await Need.create({ title, skills, date });
    res.status(201).json({ message: 'Need added successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Database error' });
  }
});

app.delete('/needs/:id', async (req, res) => {
  try {
    await Need.findByIdAndDelete(req.params.id);
    res.json({ message: 'Need deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Database error' });
  }
});

app.post('/admin/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@volunteer.org' && password === 'admin123') {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
