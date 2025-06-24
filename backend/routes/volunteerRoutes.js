 const express = require('express');
const router = express.Router();
const { getVolunteers, registerVolunteer, deleteVolunteer, updateVolunteer } = require('../controllers/volunteerController');
const verifyAdmin = require('../middleware/auth');

router.get('/', getVolunteers);
router.post('/', registerVolunteer);
router.delete('/:id', verifyAdmin, deleteVolunteer);
router.put('/:id', verifyAdmin, updateVolunteer);

module.exports = router;

