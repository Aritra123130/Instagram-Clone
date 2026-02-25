const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes  = require('./Routes/auth.Route')
const app = express();
const cors = require('cors');

const userRoutes= require('./Routes/user.Routes');
const postRoutes = require('./Routes/post.Route')
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}));


app.use('/api/auth',authRoutes);

app.use('/api/post',postRoutes);
app.use('/api/users',userRoutes);
module.exports  = app; 