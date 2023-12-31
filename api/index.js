const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const app = express();

const salt = bcrypt.genSaltSync(10);
const secret = 'asdfe45we45w345wegw345werjktjwertkj';

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/blog')

app.post('/register', async (req,res) => {
    const {username, password} = req.body;
    try{
      const userDoc = await User.create({ username, password:bcrypt.hashSync(password, salt),});
      res.json(userDoc);   
    } catch(e) {
        res.status(400).json(e) 
      }
});

app.listen(4000);