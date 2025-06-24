 const express = require('express');
const router = express.Router();
const { getNeeds, createNeed, deleteNeed, updateNeed } = require('../controllers/needController');
const verifyAdmin = require('../middleware/auth');

router.get('/', getNeeds);
router.post('/', verifyAdmin, createNeed);
router.delete('/:id', verifyAdmin, deleteNeed);
router.put('/:id', verifyAdmin, updateNeed);

module.exports = router;

