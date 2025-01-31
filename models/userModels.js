const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const UserSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        trim: true,
    },
    email: {
        required: true,
        type: String,
        trim: true
    },
    password: {
        required: true,
        type: String
    },
    description: {
        type: String,
        default: null
    },
   
   
},{
    timestamps: true,
    versionKey: false
})

UserSchema.pre('save', async function(next){
    hash_password = await bcrypt.hash(this.password, 10);
    this.password = hash_password
    next()
})

UserSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };

const User = mongoose.model('user', UserSchema)
module.exports = User