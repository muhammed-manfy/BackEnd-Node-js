const Message_Model = require('../models/Message.js');

exports.getMessagesPagination = async (req, res) => {
    const pageSize = parseInt(req.body.pageSize);
    const currentPage = parseInt(req.body.currentPage);
    try{
        const totalMessages = await (await Message_Model.find()).length;
        const messages = await Message_Model.find().skip(pageSize * currentPage).limit(pageSize);
        res.status(200).json({
            totalMessages:totalMessages,
            messages:messages
        });
    }catch(erorr){
        res.status(500).json(erorr);
    }
}

exports.deleteMessage = async (req, res) => {
    const id = req.params.id;
    try{
        await Message_Model.findByIdAndDelete(id);
            res.status(200).json({
                message: "Deleted Successful!"
            });
    }catch(erorr){
        req.status(500).json(erorr);
    }
}

exports.createMessage = async (req, res) => {
    const message = new Message_Model({
        fullName: req.body.fullName,
        message: req.body.message,
        phone: req.body.phone,
        created_at: Date.now()
    });
    try{
        await message.save();
        res.status(201).json({
            message:"your message is send"
        });
    }catch(error){
        res.status(501).json(error);
    }
}
