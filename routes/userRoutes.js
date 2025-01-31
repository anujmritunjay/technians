const express = require('express')
const authMiddleware = require('./../middlewares/authMiddleware')
const userControllers = require('./../controllers/userControllers')
const router = express.Router()


router.post('/sign-up', userControllers.signUp)
router.post('/log-in', userControllers.login)
router.get('/me',authMiddleware, userControllers.me)
router.delete('/delete-user/:id',authMiddleware, userControllers.deleteUser)



module.exports = router