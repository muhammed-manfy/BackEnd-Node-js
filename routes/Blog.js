const express = require("express");
const router = express.Router();
const blogController = require('../controllers/blogController.js') 
const blogMiddleware = require('../middelware/upload.js');
const blogUpload = blogMiddleware.uploadBlog;
const adminMiddleware = require('../middelware/checkAuthAdmin.js');

// get blogs  
router.get('/', blogController.getBlogs);
//  update a blog 
router.put('/update/:id',[blogUpload.single('video'),adminMiddleware.auth],blogController.updateBlog);
//  delete a blog 
router.delete('/delete/:id',adminMiddleware.auth ,blogController.deleteBlog);
//  create a blog
router.post('/create',[blogUpload.single('video'),adminMiddleware.auth],blogController.createBlog); 
//  blogs pagination 
router.post('/pagination',blogController.blogsPagination); 
// register a like 
router.get('/register/like',blogController.likeRegister);
// display blogs 
router.post('/displayBlogs',blogController.displayBlogs);

module.exports = router;