const express = require("express");
const router = express.Router();
const adminMiddlware = require("../middelware/checkAuthAdmin.js");
const adminController = require('../controllers/adminController.js')

// get a admin  
router.get('/get', adminController.getAdmin);
// update an Email 
router.put('/updateEmail/profile/:id', adminMiddlware.auth, adminController.updateAdminEmail);
// update password
router.put('/updatePassword/profile/:id', adminMiddlware.auth, adminController.updateAdminPassword);
// register a admin
router.post('/create', adminController.createAdmin);
// login a admin
router.post('/login', adminController.loginAdmin);
// logout admin
router.post('/logout', adminMiddlware.auth, adminController.logoutAdmin);

module.exports = router;