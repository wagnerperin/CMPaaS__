module.exports = app => {
    const api = {};

    const mapModel = require('mongoose').model('Map');
    const userModel = require('mongoose').model('User');

    api.create = async (req, res) => {
        try{
            if(req.isAuthenticated()){
                req.body = {
                    ...req.body,
                    author: {
                        _id: req.user._id
                    }
                };
                let newMap = await mapModel.create(req.body);
                await userModel.updateOne(
                    { _id: req.user._id },
                    { $push: { maps: newMap._id } } 
                );
            }else await mapModel.create(req.body);
            
            res.sendStatus(201); 
        }catch(error) {
            res.status(400).json({ error });
        } 
    };

    return api;
}