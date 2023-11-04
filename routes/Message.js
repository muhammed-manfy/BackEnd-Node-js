const express = require("express");
const router = express.Router();
const messagesController = require('../controllers/messagesController.js')

// get messages  
router.post('/pagination',messagesController.getMessagesPagination);

// delete a message 
router.delete('/delete/:id',messagesController.deleteMessage);

// create a message
router.post('/create',messagesController.createMessage);

module.exports = router;