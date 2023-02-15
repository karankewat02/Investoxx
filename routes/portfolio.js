require('dotenv').config()
const router = require('express').Router();
const POLARDBconnection = require('../POLARDB.config');
const axios = require('axios');


// ADD STOCK TO PORTFOLIO

router.post('/addStock', (req, res) => {
    const symbol = req.body.symbol;
    const name = req.body.name;
    const predicted_price = req.body.predicted_price;
    const email = req.body.email;

    const table_base_name = email.replace(/[@.]/g, "")

    const SQL = `INSERT INTO ${table_base_name}_portfolio (symbol, name, predicted_price) VALUES ('${symbol}', '${name}', '${predicted_price}')`;

    POLARDBconnection.query(SQL, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send({error: err, message: 'Error adding stock to portfolio'});
        } else {
            res.status(200).send({message: 'Stock added to portfolio successfully', result});
        }
    });

})


// DELETE STOCK FROM PORTFOLIO

router.delete('/deleteStock', (req, res) => {
    const symbol = req.body.symbol;
    const email = req.body.email;

    const table_base_name = email.replace(/[@.]/g, "")

    const SQL = `DELETE FROM ${table_base_name}_portfolio WHERE symbol = '${symbol}'`;

    POLARDBconnection.query(SQL, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send({error: err, message: 'Error deleting stock from portfolio'});
        } else {
            res.status(200).send({message: 'Stock deleted from portfolio successfully', result});
        }
    });

})



module.exports = router;