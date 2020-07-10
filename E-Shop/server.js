const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(express.static('.'));

app.get('/catalogData', (req, res) => {
    fs.readFile('catalog.json', 'utf8', (err, data) => {
        res.send(data);
    })
});

app.get('/cartData', (req, res) => {
    fs.readFile('cart.json', 'utf8', (err, data) => {
        res.send(data);
    })
});

app.post('/cartData', (req, res) => {
    fs.readFile('cart.json', 'utf8', (err, data) => {
        if (err) {
            res.send('{"result: 0}');
        } else {
            const cart = JSON.parse(data);
            const item = req.body;

            cart.push(item);

            fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
                if (err) {
                    res.send('{"result: 0}');
                } else {
                    res.send('{"result: 1}');
                }
            });
        }
    })
});

app.put('/cartDataAdd', (req, res) => {
    fs.readFile('cart.json', 'utf8', (err, data) => {
        if (err) {
            res.send('{"result: 0}');
        } else {
            const cart = JSON.parse(data);
            const id = req.body.id_product;
            const amount = req.body.amount

            let find = cart.contents.find(el => el.id_product == id);
            find.quantity += amount;

            fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
                if (err) {
                    res.send('{"result: 0}');
                } else {
                    res.send('{"result: 1}');
                }
            });
        }
    })
});

app.delete('/cartData/:id', (req, res) => {
    fs.readFile('cart.json', 'utf8', (err, data) => {
        if (err) {
            res.send('{"result: 0}');
        } else {
            const cart = JSON.parse(data);
            const id = req.body.id_product;
            
            let find = cart.contents.find(el => el.id_product == id);
            basket.contents.splice(basket.contents.indexOf(find), 1);

            fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
                if (err) {
                    res.send('{"result: 0}');
                } else {
                    res.send('{"result: 1}');
                }
            });
        }
    })
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});