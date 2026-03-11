(function(){
const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const characters = require('../controllers/characterController');
const cards = require('../controllers/cardController');
const skills = require('../controllers/skillController');

// Characters
router.get('/characters', characters.getAll);
router.get('/characters/:id', characters.getById);
router.post('/characters', authMiddleware, roleMiddleware('admin'), characters.create);
router.put('/characters/:id', authMiddleware, roleMiddleware('admin'), characters.update);
router.delete('/characters/:id', authMiddleware, roleMiddleware('admin'), characters.remove);

// Cards
router.get('/cards', cards.getAll);
router.get('/cards/:id', cards.getById);
router.post('/cards', authMiddleware, roleMiddleware('admin'), cards.create);
router.put('/cards/:id', authMiddleware, roleMiddleware('admin'), cards.update);
router.delete('/cards/:id', authMiddleware, roleMiddleware('admin'), cards.remove);

// Skills
router.get('/skills', skills.getAll);
router.get('/skills/:id', skills.getById);
router.post('/skills', authMiddleware, roleMiddleware('admin'), skills.create);
router.put('/skills/:id', authMiddleware, roleMiddleware('admin'), skills.update);
router.delete('/skills/:id', authMiddleware, roleMiddleware('admin'), skills.remove);

module.exports = router;
})();

