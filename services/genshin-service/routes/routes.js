const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const characters = require('../controllers/characterController');
const artifacts = require('../controllers/artifactController');
const weapons = require('../controllers/weaponController');

// Characters
router.get('/characters', characters.getAll);
router.get('/characters/:id', characters.getById);
router.post('/characters', authMiddleware, roleMiddleware('admin'), characters.create);
router.put('/characters/:id', authMiddleware, roleMiddleware('admin'), characters.update);
router.delete('/characters/:id', authMiddleware, roleMiddleware('admin'), characters.remove);

// Artifacts
router.get('/artifacts', artifacts.getAll);
router.get('/artifacts/:id', artifacts.getById);
router.post('/artifacts', authMiddleware, roleMiddleware('admin'), artifacts.create);
router.put('/artifacts/:id', authMiddleware, roleMiddleware('admin'), artifacts.update);
router.delete('/artifacts/:id', authMiddleware, roleMiddleware('admin'), artifacts.remove);

// Weapons
router.get('/weapons', weapons.getAll);
router.get('/weapons/:id', weapons.getById);
router.post('/weapons', authMiddleware, roleMiddleware('admin'), weapons.create);
router.put('/weapons/:id', authMiddleware, roleMiddleware('admin'), weapons.update);
router.delete('/weapons/:id', authMiddleware, roleMiddleware('admin'), weapons.remove);

module.exports = router;

