require('dotenv').config()
const router = require('express').Router();
const POLARDBconnection = require('../POLARDB.config');
const axios = require('axios');

router.get('/all-predictions', (req, res) => {
    const SQL = `SELECT * FROM stock_analysis;`;

    POLARDBconnection.query(SQL, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({error: err});
        } else {
            res.status(200).send({message: 'Data Fetched', result});
        }
    });

});


router.post('/add-prediction', async (req, res) => {
    const symbol = req.body.Symbol;
    const name = req.body.Name;
    const marketCap = req.body.marketCap.replace(/,/g, '');
    const stockType = req.body.marketSize;


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

        // res.status(200).send({message: 'Data Fetched', lastKnownPrice, predictedPrice , symbol, name, marketCap, stockType});
    const SQL = `INSERT INTO stock_analysis (symbol, name, market_cap, stock_type, last_known_price, predicted_performance) VALUES ('${symbol}', '${name}', '${marketCap}', '${stockType}', '${lastKnownPrice}', '${predictedPrice}');`;

    POLARDBconnection.query(SQL, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({error: err});
        } else {
            res.status(200).send({message: 'Data Fetched', result});
        }
    });

});



module.exports = router;

