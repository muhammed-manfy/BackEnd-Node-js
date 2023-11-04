const express = require("express");
const router = express.Router();
const likesController = require('../controllers/likesController.js')

//  create a like
router.post('/create',likesController.createLike);

module.exports = router;