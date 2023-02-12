require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const POLARDBconnection = require('./POLARDB.config');
const authRoute = require('./routes/auth');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//AUTH ROUTES
app.use('/api/auth', authRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

