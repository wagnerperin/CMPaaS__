module.exports = app => {
    const jwt = require('jsonwebtoken');
    const api = {};
    const userModel = require('mongoose').model('User');
    
    const loadToken = async (req) => {
        req.isAuthenticated = () => req.user ? true : false;

        const token = req.headers['x-access-token'];
        if(!token) return {};
        
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.SECRET, (err, decoded) => {
                if(err) reject({ error: "Failed to authenticate token." });
                
                req.user = { _id: decoded.id };
                
                resolve();
            });
        });
    };

    api.authenticate = async (req, res) => {
        let user = await userModel.findOne({ email: req.body.email });
        
        if(!user || !user.validPassword(req.body.password)) return res.status(401).json({ error: "Invalid credentials." });
       
        const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: "1d" });
        res.json({ 'x-access-token': token });
        
    };

    api.authenticationOptional = async (req, res, next) => {
        await loadToken(req).catch(err => res.status(401).json({ err }));
        
        next();
    };

    api.authenticationRequired = async (req, res, next) => {
        await loadToken(req).catch(err => res.status(401).json({ err }));

        if(!req.isAuthenticated()) return res.status(401).json({ error: "Authentication required." });
        
        next();
    };

    return api;
}