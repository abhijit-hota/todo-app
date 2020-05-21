const express = require('express');
const todoController = require('./controllers/todoController');

const app = express();

app.set('view engine', 'ejs');
app.use('/public', express.static('./public'));

todoController(app);

app.listen(3000);