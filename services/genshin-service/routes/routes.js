const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const characters = require('../controllers/characterController');
const artifacts = require('../controllers/artifactController');
const weapons = require('../controllers/weaponController');

// Characters
router.get('/characters', characters.getAll);
router.get('/characters/simple', characters.getSimpleList);
router.get('/characters/:id', characters.getById);
router.post('/characters', authMiddleware, roleMiddleware('admin'), characters.create);
router.put('/characters/:id', authMiddleware, roleMiddleware('admin'), characters.update);
router.delete('/characters/:id', authMiddleware, roleMiddleware('admin'), characters.remove);
// Character relations
router.post('/characters/:id/teammates', authMiddleware, roleMiddleware('admin'), characters.addTeammate);
router.post('/characters/:id/recommendedWeapons', authMiddleware, roleMiddleware('admin'), characters.addRecommendedWeapon);
router.post('/characters/:id/recommendedArtifacts', authMiddleware, roleMiddleware('admin'), characters.addRecommendedArtifact);
router.delete('/characters/:id/:field/:relatedId', authMiddleware, roleMiddleware('admin'), characters.removeRelation);

// Artifacts
router.get('/artifacts', artifacts.getAll);
router.get('/artifacts/simple', artifacts.getSimpleList);
router.get('/artifacts/:id', artifacts.getById);
router.post('/artifacts', authMiddleware, roleMiddleware('admin'), artifacts.create);
router.put('/artifacts/:id', authMiddleware, roleMiddleware('admin'), artifacts.update);
router.delete('/artifacts/:id', authMiddleware, roleMiddleware('admin'), artifacts.remove);
router.post('/artifacts/:id/recommendedCharacters', authMiddleware, roleMiddleware('admin'), artifacts.addRecommendedCharacter);
router.delete('/artifacts/:id/recommendedCharacters/:relatedId', authMiddleware, roleMiddleware('admin'), artifacts.removeRecommendedCharacter);

// Weapons
router.get('/weapons', weapons.getAll);
router.get('/weapons/simple', weapons.getSimpleList);
router.get('/weapons/:id', weapons.getById);
router.post('/weapons', authMiddleware, roleMiddleware('admin'), weapons.create);
router.put('/weapons/:id', authMiddleware, roleMiddleware('admin'), weapons.update);
router.delete('/weapons/:id', authMiddleware, roleMiddleware('admin'), weapons.remove);
router.post('/weapons/:id/recommendedCharacters', authMiddleware, roleMiddleware('admin'), weapons.addRecommendedCharacter);
router.delete('/weapons/:id/recommendedCharacters/:relatedId', authMiddleware, roleMiddleware('admin'), weapons.removeRecommendedCharacter);

module.exports = router;

