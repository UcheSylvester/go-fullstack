// MONGODB CONNECTION: mongodb+srv://Uche:<password>@cluster0-2dlsn.mongodb.net/test?retryWrites=true&w=majority

const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const stuffRoutes = require('./routes/stuff')

const app = express()

// Connecting to the database
mongoose.connect('mongodb+srv://Uche:@uc62845441.@cluster0-2dlsn.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('successfully connected to MongoDB Atlas')
  })
  .catch((error) => console.log('unable to connect to database', error))

// Setting headers for CORS 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Content, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next()
})

app.use(bodyParser.json())
app.use('/api/stuff', stuffRoutes)

module.exports = app;