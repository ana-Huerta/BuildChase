const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const characters = require('../controllers/charactersController');
const lightcones = require('../controllers/lightconesController');
const artifacts = require('../controllers/artifactsController');

// Characters
router.get('/characters', characters.getAll);
router.get('/characters/:id', characters.getById);
router.post('/characters', authMiddleware, roleMiddleware('admin'), characters.create);
router.put('/characters/:id', authMiddleware, roleMiddleware('admin'), characters.update);
router.delete('/characters/:id', authMiddleware, roleMiddleware('admin'), characters.remove);

// Lightcones
router.get('/lightcones', lightcones.getAll);
router.get('/lightcones/:id', lightcones.getById);
router.post('/lightcones', authMiddleware, roleMiddleware('admin'), lightcones.create);
router.put('/lightcones/:id', authMiddleware, roleMiddleware('admin'), lightcones.update);
router.delete('/lightcones/:id', authMiddleware, roleMiddleware('admin'), lightcones.remove);

// Artifacts
router.get('/artifacts', artifacts.getAll);
router.get('/artifacts/:id', artifacts.getById);
router.post('/artifacts', authMiddleware, roleMiddleware('admin'), artifacts.create);
router.put('/artifacts/:id', authMiddleware, roleMiddleware('admin'), artifacts.update);
router.delete('/artifacts/:id', authMiddleware, roleMiddleware('admin'), artifacts.remove);

module.exports = router;
