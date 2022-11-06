const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const storyRoutes = require('./routes/storyRoutes')
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 5000;
const connectUrl = process.env.MONGO_URL || 'www.mondodb.com'

//connect to the mongoAtlas db 
mongoose.connect(`${connectUrl}`);

app.use(express.json(), helmet(), cors());
app.use('/api/stories', storyRoutes);
app.use('/api/auth', userRoutes);

app.get('/', (req, res) => res.send('Secret Storeis API'));

app.listen(port, () => console.log(`listening on port: ${port}`));