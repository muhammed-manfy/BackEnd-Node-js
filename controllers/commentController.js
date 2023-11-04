const Comment_Model = require('../models/Comment.js');

exports.getCommentsProduct = async (req, res) => {
    const id = req.params.id;
    const currentPage = req.body.currentPage;
    const pageSize = req.body.pageSize;
    try {
        const totalComments = await Comment_Model.find({ product_id: id });
        const comments = await Comment_Model.find({ product_id: id }).skip(pageSize * currentPage).limit(pageSize);
        res.status(200).json({
            data: comments,
            totalComments: totalComments.length,
            message: 'success',
            status: true
        });

    } catch (error) {
        res.status(504).json({
            message: error.message,
            status: false
        });
    }
}

exports.deleteComment = async (req, res) => {
    const id = req.params.id;

    await Comment_Model.findByIdAndDelete(id).exec()
        .then(() => {
            res.status(200).json({
                message: "Deleted Comment Successfully!"
            });
        }).catch((error) => {
            res.status(501).json(error);
        });
}

exports.updateComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        Comment_Model.findByIdAndUpdate(commentId, {
            username: req.body.username,
            comment: req.body.comment,
        });
        res.status(200).json({
            message: 'Comment updated successfully!',
            status: true
        });

    } catch (error) {
        res.status(505).json({
            message: error.message,
            status: false
        });
    }
}

exports.createComment = async (req, res) => {
    const comment = new Comment_Model({
        username: req.body.username,
        comment: req.body.comment,
        product_id: req.body.product_id,
        created_at: Date.now()
    });
    const newComment = comment.save();
    await newComment.then(() => {
        res.status(201).json({
            message: "Comment saved successfully!",
            status: true
        });
    }).catch((error) => {
        res.status(501).json({
            message: error.message,
            status: false
        });
    });
}

exports.getProductsCommnets = async (req, res) => {
    try {
        const product_id = req.params.product_id;
        const productComments = await Comment_Model.find({ product_id: product_id });
        res.status(200).json({
            data: productComments,
            status: true
        });
    } catch (error) {
        res.status(504).json({
            message: error.message,
            status: false
        })
    }
}