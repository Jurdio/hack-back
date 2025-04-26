const express = require('express');
const router = express.Router();
const grantController = require('./grant.controller');
const authMiddleware = require('../../common/middlewares/auth.middleware');

router.post('/', grantController.createGrant);
router.get('/', grantController.getAllGrants);
router.get('/:id', grantController.getGrantById);
router.put('/:id', grantController.updateGrant);
router.delete('/:id', grantController.deleteGrant);

module.exports = router;
