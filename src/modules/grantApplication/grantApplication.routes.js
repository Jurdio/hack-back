const express = require('express');
const router = express.Router();
const upload = require('../../common/middlewares/upload.middleware');
const { handleGrantApplication } = require('./grantApplication.controller');

router.post('/parse', upload.single('file'), handleGrantApplication);

module.exports = router;
