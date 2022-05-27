const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('../routes/authRoute');
const PORT = process.env.API_PORT;
const app = express();
app.use(express.json());
// http.request.body 데이터 형태 : json 받을경우
// 1. body-parser 모듈 사용(4.16 이전 버전). 2. express.json() 사용
app.use(cors());

app.use('/api/auth', authRoutes);
const server = http.createServer(app);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`server is listening:${PORT}`);
    });
  })
  .catch(err => {
    console.log('database connection failed. server not stated');
    console.error(err);
  });
