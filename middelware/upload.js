const multer = require('multer');

const projectStorge = multer.diskStorage({
    destination:'uploads/projects',
    filename:function(req,file,callBack){
        callBack(null,file.originalname);
    }
});
module.exports.uploadProject = multer({storage:projectStorge});

const productStorge = multer.diskStorage({
    destination:'uploads/products',
    filename:function(req,file,callBack){
        callBack(null,file.originalname);
    }
});
module.exports.uploadProduct = multer({storage:productStorge});

const  blogStorge = multer.diskStorage({
    destination:'uploads/Videos',
    filename:function(req,file,callBack){
        callBack(null,file.originalname);
    }
});
module.exports.uploadBlog = multer({storage:blogStorge});

const userStorge = multer.diskStorage({
    destination:'uploads/users',
    filename:function(req,file,callBack){
        callBack(null,file.originalname);
    }
});
module.exports.uploadUser = multer({storage:userStorge});