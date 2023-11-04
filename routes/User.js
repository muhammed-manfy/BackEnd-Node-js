const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController.js'); 
const usermiddlware = require('../middelware/checkUserAuth.js');
const userAuth  = usermiddlware.auth;
const userUploadMiddlware = require('../middelware/upload.js');
const userImage = userUploadMiddlware.uploadUser; 
const adminMiddlware = require('../middelware/checkAuthAdmin.js');
const adminAuth = adminMiddlware.auth;
// get all users 
router.post('/admin/allUsers' , adminAuth , userController.getUsers);
// get a user
router.get('/getUser/:id',userController.getUser);

//  update a email user profile 
router.put('/updateEmailUser/:id',userAuth,userController.updateEmailProfile);

//  update a phone user profile 
router.put('/updatePhoneUser/:id',userAuth,userController.updatePhoneProfile);

//  update a password user profile 
router.put('/updatePasswordUser/:id',userAuth,userController.updatePasswordProfile);  

//  update a user address 
router.put('/updateAddress/:id',userAuth,userController.updateAddress);

// update a profile image    
router.put('/updateUserImage/:id',[userAuth,userImage.single('image')],userController.updateUserImage)

//  delete a user 
router.delete('/deleteUser/:id',userAuth,userController.deleteUser);

//  register a user
router.post('/register',userController.createUser); 

//  login a user
router.post('/login',userController.loginUser); 

//  get order  user
router.get('/getOrderUser/:id',userController.getOrderUser);

module.exports = router;