require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const POLARDBconnection = require('./POLARDB.config');

const authRoute = require('./routes/auth');
const predictionRoute = require('./routes/prediction');
const portfolioRoute = require('./routes/portfolio');
const watchlistRoute = require('./routes/watchlist');

const bodyParser = require('body-parser');
const cors = require('cors');
const data = require('./stocks.json');
const midCap = require('./data.json');
const axios = require('axios');


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// GET INDEX Data
app.post('/index', async(req, res) => {
    const symbol = req.body.symbol;
    const API = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=5d&range=2mo`
    await axios.get(API)
        .then((response) => {
            const data = response.data.chart.result[0].indicators.quote[0];
            const timestamp = response.data.chart.result[0].timestamp;
            const result = [];
            
            for (let i = 0; i < data.close.length; i++) {
                    const date = new Date(timestamp[i] * 1000);
                    const day = date.getDate();
                    const month = date.getMonth() + 1;
                    const formattedDate = `${day}/${month}`;
                    result.push({
                        date: formattedDate,
                        close: data.close[i],
                        high: data.high[i],
                        low: data.low[i],
                        open: data.open[i],
                        volume: data.volume[i]
                    });
            }

            var differece = result[0].close - result[result.length - 1].close;
            var percentage = (differece / result[result.length - 1].close) * 100;
            
            res.status(200).send({result, differece, percentage});
        })
        .catch((error) => {
            res.status(400).send({error: error, message: 'Error fetching data'});
        });


});

// Get the sentiment of the News
app.post('/sentiment', async(req, res) => {
    const news =  req.body.news;
    const API = "http://127.0.0.1:8000/get_news_analysis/"
    await axios.post(API, {
        news: news
    })
    .then((response) => {
        res.status(200).send(response.data);
    })
    .catch((error) => {
        res.status(400).send({error: error, message: 'Error fetching data'});
    });

})

//AUTH ROUTES
app.use('/api/auth', authRoute);

//PREDICTION ROUTES
app.use('/api/prediction', predictionRoute);

//PORTFOLIO ROUTES
app.use('/api/portfolio', portfolioRoute);

// WATCHLIST ROUTES
app.use('/api/watchlist', watchlistRoute);

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

// GET count of stocks

app.get('/count', (req, res) => {
    const SQL = 'SELECT COUNT(*) as count FROM stock_analysis;'

    POLARDBconnection.query(SQL, (err, result) => {
        if (err) {
            res.status(400).send({error: err, message: 'Error fetching data'});
        } else {
            res.status(200).send(result);
        }
    });

});



