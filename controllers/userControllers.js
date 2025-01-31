const User = require('./../models/userModels')
const ErrorHandler = require('./../utils/errorHandler')
const {createToken, conmparePassword} = require('./../services/userServices')



exports.signUp = async(req, res, next)=>{
    try {
        
        const { name, email, password } = req.body 
        const userPayload = {name, email, password} 
        const isExists = await User.findOne({email: email})
        if(isExists && isExists._id){
            return next(new ErrorHandler('User already exists.'))
        }
        const user = await User.create(userPayload)
        if(user && user._id){
            const token = createToken(user._id)
            res.json({
                success: true,
                data: user,
                token
            })
        }else{
            return next(new ErrorHandler('Failed to create user'))
        }
    } catch (error) {
        return next(error)
    }
}

exports.login = async(req, res, next)=>{
    try {
        
        const { email, password } = req.body 
        const user = await User.findOne({email: email}).lean()
        if(user && user._id){
            const isPasswordCorrect = await conmparePassword(password, user.password)
            console.log(isPasswordCorrect)
            delete user.password
            if(!isPasswordCorrect){
                return next(new ErrorHandler('Invalid credentials.'))
            }
            const token = await createToken(user._id)
            res.json({
                success: true,
                data: user,
                token
            })
        }else{
            return next(new ErrorHandler('User not found.'))
        }
       
    } catch (error) {
        return next(error)
    }
    
}


exports.me = async(req, res, next)=>{
    try {
        const user = req.user
        if(user && user._id){
            res.json({
                success: true,
                data: user
            })
        }else{
            return next(new ErrorHandler('Unauthorized.'))
        }
    } catch (error) {
        return next(error)
    }
}
exports.deleteUser = async(req, res, next)=>{
    try {
        const { id } = req.params

        const isDeleted = await User.findOneAndDelete({"_id": id})
       
        if(!isDeleted){
            return next(new ErrorHandler('User not found.', 404))
        }
       
        res.json({
            success: true,
            message: "User deleted successfully."
        })
    } catch (error) {
        return next(error)
    }
}
