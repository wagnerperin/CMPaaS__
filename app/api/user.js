module.exports = app => {
    const api = {};

    const userModel = require('mongoose').model('User');

    api.create = async (req, res) => {
        try{
            await userModel.create(req.body);
            res.sendStatus(201); 
        }catch(error) {
            res.status(400).json({ error });
        } 
    };

    api.list = async (req, res) => {
        res.json({ok: true});
    }

    return api;
}