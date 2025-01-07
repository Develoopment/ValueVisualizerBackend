const express = require('express');
const dotenv = require('dotenv')
const cors = require('cors')
const openai = require('openai')

// setting up express app object
const app = express();

// saying that our app should us cors -> this will allow the client to send requests here
app.use(cors());

app.get('/valuescan', (req, res) => {

    res.json({"title":'value'})

})

app.listen(process.env.PORT || 9000, () => {console.log('app online at port 9000')});