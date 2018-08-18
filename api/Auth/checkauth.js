const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const decoded = jwt.verify(req.headers.authorization, 'ManageIt');
        if(decoded.username === req.headers.localstorageuser){
            throw "Error - Activate Localstorage, Sessionstorage and Cookies"
        }
        res.status(200).json({message: 'Login authorized'})
        next();
    }
    catch(err){
        
        return res.status(401).json({message: 'unauthorized'})

    }
}