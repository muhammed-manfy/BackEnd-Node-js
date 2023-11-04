const Blog_Model = require('../models/Blog.js');

exports.getBlogs = async (req, res) => {

    try {
        const blogs = await Blog_Model.find({});
        res.status(200).json({
            data: blogs,
            message: "Success",
            status: true,
        });
    } catch (error) {
        res.status(504).json({
            message: err.message,
            status: false,
        });
    }
}

exports.updateBlog = async (req, res) => {

    const url = req.protocol + '://' + req.get("host");
    const id = req.params.id;
    try {
        await Blog_Model.findByIdAndUpdate(id, {
            title: req.body.title,
            description: req.body.description,
            video: url + '//' + req.file.path,
            tag: req.body.tag,
            category: req.body.category,
            updated_at: Date.now()
        });
        res.status(200).json({
            message: "Updated Successful!",
            status: true,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false
        });
    }
}

exports.deleteBlog = async (req, res) => {
    try {
        const id =req.params.id;
        await Blog_Model.findByIdAndDelete(id);
        res.status(200).json({
            message: "Deleted A Blog Successfully!",
            satus: true
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false
        });
    }
}

exports.createBlog = async (req, res, next) => {
    const blogData = req.body;
    let blogValidMessage = validationBlog(blogData);

    if (blogValidMessage !== null) {
        res.status(400).json({
            message: blogValidMessage,
            status: false,
        });
    } else {
        const url = req.protocol + '://' + req.get("host");
        const blog = new Blog_Model({
            title: req.body.title,
            description: req.body.description,
            video: url + '/' + req.file.path,
            tag: req.body.tag,
            category: req.body.category,
            like: 0,
            created_at: Date.now()
        });
        try {
            await blog.save();
            res.status(201).json({
                message: "Created Successfully!",
                status: true
            });
            next();
        } catch (error) {
            res.status(501).json({
                message: error.message,
                status: false
            });
        }
    }
}

exports.likeRegister = async (req, res) => {
    const id = req.params.id;
    try {
        await Blog_Model.findByIdAndUpdate(id, {
            like: req.body.like,
            updated_at: Date.now()
        }).then((data) => {
            res.status(200).json({
                message: "Thank You for Your Like",
                status: true,
                likes: data.like
            });
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false
        });
    }
}
exports.blogsPagination = async (req, res) => {
    const pageSize = parseInt(req.body.pageSize);
    const currentPage = parseInt(req.body.currentPage);

    try {
        const totalBlogs = await (await Blog_Model.find()).length;
        const blogs = await Blog_Model.find().skip(pageSize * currentPage).limit(pageSize);
        res.status(206).json({
            data: blogs,
            totalBlogs: totalBlogs,
            message: "success",
            status: true
        });
    } catch (error) {
        res.status(506).json({
            message: error.message,
            status: false
        })
    }
}


exports.displayBlogs = async (req, res) => {
    const pageSize = parseInt(req.body.pageSize);
    const currentPage = parseInt(req.body.currentPage);
    const category = req.body.category;
    const tag = req.body.tag;
    const sortAsc = req.body.sortAsc;
    const sortDesc = req.body.sortDesc;
    try {

        if (category) {
            const totalBlogs = (await Blog_Model.find({ category: category })).length;
            const categoriesBlogs = await Blog_Model.find({ category: category }).skip(pageSize * currentPage).limit(pageSize);
            return res.status(206).json({
                blogs: categoriesBlogs,
                totalblogs: totalBlogs,
                message: "success",
                status: true
            });
        } else if (tag) {
            const totalBlogs = (await Blog_Model.find({ tag: tag })).length;
            const tagBlogs = await Blog_Model.find({ tag: tag }).skip(pageSize * currentPage).limit(pageSize);
            return res.status(206).json({
                blogs: tagBlogs,
                totalBlogs: totalBlogs,
                message: "success",
                status: true
            });    
        }    
        const totalBlogs = (await Blog_Model.find()).length;
        const blogs = await Blog_Model.find().skip(pageSize * currentPage).limit(pageSize);
        return res.status(200).json({
            blogs: blogs,
            totalBlogs: totalBlogs,
            message: "success",
            status: true
        });
    } catch (error) {
        res.status(506).json({
            message: error.message,
            status: false
        })
    }
}

// validation blog code 

function validationBlog(data) {

    if (data.title == '' || data.title == undefined)
        return "title is required";

    else if (data.description == '' || data.description == undefined)
        return "description is required";

    else if (data.tag == '' || data.tag == undefined)
        return "tag is required";

    else if (data.category == '' || data.category == undefined)
        return "category is required";

    return null;
}