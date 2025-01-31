const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')


const SECRET_KEY = 'MYULTRASECRETEKY'; 

const createToken = (userId)=> {
    const payload = {
        userId: userId
    };

    const token = jwt.sign(payload, SECRET_KEY); 
    return token;
}

const conmparePassword = async(userPass, dbPass) =>{
    return  await bcrypt.compare(userPass, dbPass);
}

module.exports = {createToken, conmparePassword};
