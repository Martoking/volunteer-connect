const Need = require('../models/Need');

exports.getNeeds = async (req, res) => {
  try {
    const needs = await Need.find();
    res.json(needs);
  } catch {
    res.status(500).json({ message: 'Database error' });
  }
};

exports.createNeed = async (req, res) => {
  const { title, skills, date } = req.body;
  if (!title || !skills || !date) return res.status(400).json({ message: 'All fields required.' });
  try {
    await Need.create({ title, skills, date });
    res.status(201).json({ message: 'Need added successfully.' });
  } catch {
    res.status(500).json({ message: 'Database error' });
  }
};

exports.deleteNeed = async (req, res) => {
  try {
    await Need.findByIdAndDelete(req.params.id);
    res.json({ message: 'Need deleted.' });
  } catch {
    res.status(500).json({ message: 'Database error' });
  }
};

exports.updateNeed = async (req, res) => {
  try {
    const updated = await Need.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch {
    res.status(500).json({ message: 'Database error' });
  }
};

