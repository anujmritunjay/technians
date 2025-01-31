const express = require('express')
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoutes')
const errorMiddleware = require('./middlewares/errorMiddleware')



const app = express()
const PORT = 4040
const DB = "mongodb+srv://mritunjaystudies:admin@cluster0.lmyhyph.mongodb.net/node-interview";

app.use(express.json())

app.use('/user', userRoute)
app.use(errorMiddleware)
app.get('/', (req, res)=>{
    res.json({
        success: true,
        message: "Node JS interview Assignment"
    })
})

mongoose.connect(DB).then(()=> console.log("Database connected successfully.")).catch(err => console.log(err))


app.listen(PORT, ()=> console.log(`Server is running on the port ${PORT}`))