module.exports = app => {
    const jwt = require('jsonwebtoken');
    const api = {};

    const userModel = require('mongoose').model('User');

    api.authenticate = async (req, res) => {
        let user = await userModel.findOne({ email: req.body.email });
        
        if(!user || !user.validPassword(req.body.password)) return res.status(401).json({ error: "Invalid credentials." });
       
        const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: "1d" });
        res.json({ 'x-access-token': token });
        
    };

    api.authenticationRequired = async (req, res, next) => {
        const token = req.headers['x-access-token'];
        if(!token) return res.status(401).json({ error: "Authentication required." });

        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if(err) return res.status(401).json({ error: "Failed to authenticate token." });
            
            req.user = { _id: decoded.id };
            next();
        })
    };


    return api;
}