require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const POLARDBconnection = require('./POLARDB.config');

const authRoute = require('./routes/auth');
const predictionRoute = require('./routes/prediction');

const bodyParser = require('body-parser');
const data = require('./stocks.json');
const midCap = require('./data.json');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//AUTH ROUTES
app.use('/api/auth', authRoute);

//PREDICTION ROUTES
app.use('/api/prediction', predictionRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// ! REMOVE THIS ROUTE AFTER TESTING

app.post('/calculate', (req, res) => {
    // Itterate array of data
    result=[];
    data.forEach((stock) => {

        // convert marketCap to number string of this format 10,000,000,000
        let marketcap = Number(stock.marketCap.replace(/,/g, ''));

        
        if (marketcap > 10000000000) {
            // Push the stock to the result array
            result.push({...stock,"marketSize":"large"});
        } else if (marketcap < 10000000000 && marketcap > 2000000000) {
            result.push({...stock,"marketSize":"medium"});
        } else {
            result.push({...stock,"marketSize":"small"});
        }
    });

            for(let i=1; i<=50; i++){
            // random number between 1 and 400
            let random = Math.floor(Math.random() * 400) + 1;
            randomresult = midCap[random]
            result.push({
                "Symbol": randomresult.symbol,
                "Name": randomresult.Security,
                "marketCap": "7,000,000,000",
                "marketSize": "mid"
              });
        }

    // Send the result array as a response
    res.send(result);
});

