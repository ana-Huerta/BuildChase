const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const characters = require('../controllers/charactersController');
const lightcones = require('../controllers/lightconesController');
const artifacts = require('../controllers/artifactsController');

// Characters
router.get('/characters/simple', characters.getSimpleList);
router.get('/characters', characters.getAll);
router.get('/characters/:id', characters.getById);
router.post('/characters', authMiddleware, roleMiddleware('admin'), characters.create);
router.put('/characters/:id', authMiddleware, roleMiddleware('admin'), characters.update);
router.delete('/characters/:id', authMiddleware, roleMiddleware('admin'), characters.remove);
// character relations
router.post('/characters/:id/teammates', authMiddleware, roleMiddleware('admin'), characters.addTeammate);
router.post('/characters/:id/recommendedLightcones', authMiddleware, roleMiddleware('admin'), characters.addRecommendedLightcone);
router.post('/characters/:id/recommendedArtifacts', authMiddleware, roleMiddleware('admin'), characters.addRecommendedArtifact);

// Lightcones
router.get('/lightcones/simple', lightcones.getSimpleList);
router.get('/lightcones', lightcones.getAll);
router.get('/lightcones/:id', lightcones.getById);
router.post('/lightcones', authMiddleware, roleMiddleware('admin'), lightcones.create);
router.put('/lightcones/:id', authMiddleware, roleMiddleware('admin'), lightcones.update);
router.delete('/lightcones/:id', authMiddleware, roleMiddleware('admin'), lightcones.remove);
// lightcone relations
router.post('/lightcones/:id/recommendedCharacters', authMiddleware, roleMiddleware('admin'), lightcones.addRecommendedCharacter);

// Artifacts
router.get('/artifacts/simple', artifacts.getSimpleList);
router.get('/artifacts', artifacts.getAll);
router.get('/artifacts/:id', artifacts.getById);
router.post('/artifacts', authMiddleware, roleMiddleware('admin'), artifacts.create);
router.put('/artifacts/:id', authMiddleware, roleMiddleware('admin'), artifacts.update);
router.delete('/artifacts/:id', authMiddleware, roleMiddleware('admin'), artifacts.remove);
// artifact relations
router.post('/artifacts/:id/recommendedCharacters', authMiddleware, roleMiddleware('admin'), artifacts.addRecommendedCharacter);

module.exports = router;
