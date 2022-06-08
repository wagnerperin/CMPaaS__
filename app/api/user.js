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
        let {limit = 10, page = 1, q} = req.query;
        const limitResults = parseInt(limit);
        const skip = (page - 1) * limitResults;

        let query = {};
        if(q){
            query = {
                $or: [
                    {'name': {
                        '$regex': q,
                        '$options': 'i'
                    }},
                    {'email': {
                        '$regex': q,
                        '$options': 'i'
                    }}
                ]
            }
        }
        let userList = await userModel.find(query).limit(limitResults).skip(skip).exec();
        res.json(userList);
    }

    return api;
}