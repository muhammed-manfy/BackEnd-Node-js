const express = require("express");
const router = express.Router();
const commentController = require('../controllers/commentController.js')

// create a product comment
router.post('/createProductComment',commentController.createComment);

// update a product comment
router.put('/updateProductComment',commentController.updateComment)

// get product comments
router.post('/getProductComments/:id',commentController.getCommentsProduct);
       
module.exports = router;