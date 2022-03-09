module.exports = app => {
    const api = {};

    const groupModel = require('mongoose').model('Group');
    const userModel = require('mongoose').model('User');

    api.create = async (req, res) => {
        try{
            req.body = {
                ...req.body,
                admin: {
                    _id: req.user._id
                }
            };
            let group = await groupModel.create(req.body);
            await userModel.updateOne(
                { _id: req.user._id },
                { $push: { groups: group._id } } 
            );
            res.sendStatus(201); 
        }catch(error) {
            res.status(400).json({ error });
        } 
    };

    return api;
}