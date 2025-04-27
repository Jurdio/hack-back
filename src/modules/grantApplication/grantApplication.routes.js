const express = require('express');
const router = express.Router();
const upload = require('../../common/middlewares/upload.middleware');
const { handleGrantApplication } = require('./grantApplication.controller');
const grantController = require('../grant/grant.controller');

router.post('/parse', upload.single('file'), handleGrantApplication, grantController.getAllGrants);

module.exports = router;
