const express = require('express');
const { generatorPDF } = require('../controller/codeController');
const router = express.Router();

const multer = require('multer');
const upload = multer();


router.post('/gerador', upload.single('file'), generatorPDF);


module.exports = router;