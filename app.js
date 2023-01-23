require('dotenv').config({ path: './config/.env' });
const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes/routes.js');
const path = require('path')

const cookieParser = require('cookie-parser');

require('./config/database').connectDatabase()


app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(cors());
app.use(cookieParser())


app.use('/api/', routes)

app.use(require('./middleware/error'));

app.listen(process.env.PORT, console.log(`Listen on port ${process.env.PORT}`))