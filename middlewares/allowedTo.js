const appError = require("../utils/appError");
// currentUser get from verfiyToken    middleware=>verfiyToken=>allowedTo for show  currentUser
module.exports = (...roles) => {    
    return (req, res, next) => {
        if(!roles.includes(req.currentUser.role)) {
            return next(appError.create('this role is not authorized', 401))
        }
        next();
    }
}