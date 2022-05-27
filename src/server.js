 const express = require ('express')
 const http = require('http')
 const cors = require('cors')
 const mongoose = require('mongoose')
 require('dotenv').config()
 
const authRoutes = require("../routes/authRoute")
 const PORT = process.env.API_PORT;
 const app = express();
 app.use(express.json())
 app.use(cors())
 
 app.use('/api/auth', authRoutes)  
 const server = http.createServer(app)

 mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
      server.listen(PORT,()=>{
          console.log(`server is listening:${PORT}`)
      })
  })
 .catch((err)=>{
     console.log('database connection failed. server not stated')
     console.error(err)
 })