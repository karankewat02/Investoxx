require('dotenv').config()
const router = require('express').Router();
const POLARDBconnection = require('../POLARDB.config');
const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api/prediction/';


// GET STOCK PREDICTION DATA
router.get('/get-prediction/:symbol', (req, res) => {
    const symbol = req.params.symbol;
    const SQL = `SELECT * FROM stock_analysis WHERE symbol = '${symbol}';`;

    POLARDBconnection.query(SQL, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({error: err});
        } else {
            console.log(result)
            let code = 200;
            let message = 'Success';
            if(result.length == 0) {
                code = 404;
                message = 'Ticker not found';
            }
            res.status(code).send({message: message, result});
        }
    });

});

router.post('/add-prediction', async (req, res) => {
    const symbol = req.body.symbol;
    let name;
    let marketCap;
    let stockType;

    const tickerapi = `https://api.polygon.io/v3/reference/tickers/${symbol}?apiKey=_UQ5h1LONGUswPwxAjNXISHMSwRoWAtH`;

    await axios.get(tickerapi)
        .then((response) => {
            name = response.data.results.name;
            marketCap = response.data.results.market_cap;
            if (marketCap < 2000000000) {
                stockType = 'small';
            }

            if (marketCap > 10000000000) {
                stockType = 'large';
            }

            if (marketCap > 2000000000 && marketCap < 10000000000) {
                stockType = 'mid';
            }

        })
        .catch((error) => {
            console.log(error);
            res.status(404).send({"error": "Ticker not found"});
            res.end();
        });
    

    let lastKnownPrice = 0;
    let predictedPrice = 0;

    // Fetch last known price and predicted price from the API
    await axios.post(process.env.PREDICTIONENDPOINT, {
            symbol: symbol,
        })
        .then((response) => {
            console.log(response.data);   
            lastKnownPrice = response.data.prediction.current;
            predictedPrice = response.data.prediction.prediction;
        })
        .catch((error) => {
            console.log(error);
        });

    const SQL = `INSERT INTO stock_analysis (symbol, name, market_cap, stock_type, last_known_price, predicted_performance) VALUES ('${symbol}', '${name}', '${marketCap}', '${stockType}', '${lastKnownPrice}', '${predictedPrice}');`;

    POLARDBconnection.query(SQL, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({error: err});
            res.end();

        } else {
            res.status(200).send({message: 'Data Added', result});
        }
    });

});


// Update the stock performance

router.put('/update-prediction', async (req, res) => {
    const symbol = req.body.symbol;
    let name;
    let marketCap;
    let stockType;

    const tickerapi = `https://api.polygon.io/v3/reference/tickers/${symbol}?apiKey=_UQ5h1LONGUswPwxAjNXISHMSwRoWAtH`;

    await axios.get(tickerapi)
        .then((response) => {
            name = response.data.results.name;
            marketCap = response.data.results.market_cap;
            if (marketCap < 2000000000) {
                stockType = 'small';
            }

            if (marketCap > 10000000000) {
                stockType = 'large';
            }

            if (marketCap > 2000000000 && marketCap < 10000000000) {
                stockType = 'mid';
            }

        })
        .catch((error) => {
            console.log(error);
            res.status(200).send({"error": "Ticker not found"});
        });
    

    let lastKnownPrice = 0;
    let predictedPrice = 0;

    // Fetch last known price and predicted price from the API
    await axios.post(process.env.PREDICTIONENDPOINT, {
            symbol: symbol,
        })
        .then((response) => {
            console.log(response.data);   
            lastKnownPrice = response.data.prediction.current;
            predictedPrice = response.data.prediction.prediction;
        })
        .catch((error) => {
            console.log(error);
        });

    const SQL = `UPDATE stock_analysis SET name = '${name}', market_cap = '${marketCap}', stock_type = '${stockType}', last_known_price = '${lastKnownPrice}', predicted_performance = '${predictedPrice}' WHERE symbol = '${symbol}';`;

    POLARDBconnection.query(SQL, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({error: err});
        } else {
            if(result.affectedRows == 0) {

                res.status(200).send({error: 'Ticker not found'});
            
            }
            res.status(200).send({message: 'Data Updated', result});
        }
    });

});





module.exports = router;

