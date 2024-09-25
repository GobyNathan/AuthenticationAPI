require('dotenv').config();
const express = require('express');
const routes = require('./routes/routes');
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.use('/', routes);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});