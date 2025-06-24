 const Volunteer = require('../models/Volunteer');

exports.getVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.json(volunteers);
  } catch {
    res.status(500).json({ message: 'Database error' });
  }
};

exports.registerVolunteer = async (req, res) => {
  const { name, email, skills } = req.body;
  if (!name || !email || !skills) return res.status(400).json({ message: 'All fields required.' });
  try {
    await Volunteer.create({ name, email, skills });
    res.status(200).json({ message: 'Volunteer registered successfully!' });
  } catch {
    res.status(500).json({ message: 'Database error' });
  }
};

exports.deleteVolunteer = async (req, res) => {
  try {
    await Volunteer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Volunteer deleted.' });
  } catch {
    res.status(500).json({ message: 'Database error' });
  }
};

exports.updateVolunteer = async (req, res) => {
  try {
    const updated = await Volunteer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch {
    res.status(500).json({ message: 'Database error' });
  }
};

