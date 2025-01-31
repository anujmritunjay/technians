const ErrorHandler = require('./../utils/errorHandler')
const User = require('./../models/userModels')
const jwt = require('jsonwebtoken');
const privateKey = 'MYULTRASECRETEKY'


const decodeToken = async(token)=>{
    const userData = jwt.verify(token, privateKey)
    return userData
}

const authMiddleware = async(req, res, next)=>{
    const authToken = req.headers?.authorization?.replace("Bearer ", "")    
    if(authToken){
        const userData = await decodeToken(authToken)
        if(userData && userData.userId){
            const user = await User.findOne({_id: userData.userId})            
            if(user && user._id){
                req.user = {...user._doc, token:authToken}
                next()
            }else{
                return next(new ErrorHandler('Unauthorized.', 401))
            }
        }else{
            return next(new ErrorHandler('Unauthorized.', 401))
        }
    }else{
        return next(new ErrorHandler('Unauthorized.', 401))
    }
}

module.exports = authMiddleware