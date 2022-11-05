const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json(), helmet(), cors());

app.get('/', (req, res) => res.send('Secret Storeis API'));

app.listen(port, () => `listening on port: ${port}`);