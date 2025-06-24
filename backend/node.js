// Update Volunteer
app.put('/volunteers/:id', async (req, res) => {
  try {
    const updated = await Volunteer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Database error' });
  }
});

// Update Need
app.put('/needs/:id', async (req, res) => {
  try {
    const updated = await Need.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Database error' });
  }
});
