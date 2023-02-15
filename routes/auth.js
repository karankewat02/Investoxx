const router = require('express').Router();
const POLARDBconnection = require('../POLARDB.config');
const CryptoJS =require("crypto-js");
const { v4: uuidv4 } = require('uuid');

router.get('/', (req, res) => {
    res.send('Hello World!');
});

// REGISTER

router.post('/register', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC.toString());
    const id = uuidv4();

    const SQL = `INSERT INTO users (id, name, email, password) VALUES ('${id}', '${name}', '${email}', '${password}')`;


    POLARDBconnection.query(SQL, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send({error: err, message: 'Error email already registered'});
        } else {
            res.status(200).send({message: 'User registered successfully', result});
        }
    });
});




// LOGIN

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const SQL = `SELECT * FROM users WHERE email = '${email}';`;

    POLARDBconnection.query(SQL, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({error: err, message: 'Error'});
        } else {
            if (result.length === 0) {
                res.status(400).send({message: 'User not found'});
            }else{
                const bytes = CryptoJS.AES.decrypt(result[0].password, process.env.PASS_SEC);
                const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
                
                if (password === originalPassword) {
                    res.status(200).send({message: 'Login successful', result});
                } else {
                    res.status(400).send({message: 'Incorrect password'});
                }
            }
        }

    });

});




    

module.exports = router;