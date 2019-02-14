require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');

const app = express();

const ctrl = require('./controller');

const {CONNECTION_STRING} = process.env
console.log(CONNECTION_STRING)

massive(CONNECTION_STRING).then((dbInstance) => {  
	app.set('db', dbInstance);
	app.listen(PORT, () => console.log(`Port ${PORT}, reporting for duty!`))
	console.log(`we are connected`)
})

app.use(bodyParser.json());


// ENDPOINTS

app.get('/api/all', ctrl.getAll)

app.get('/api/account/:id', ctrl.getOneAccount)

app.post('/api/account', ctrl.newAccount)

app.put('/api/account/:id', ctrl.updateAccount)

app.delete('/api/account/:id', ctrl.deleteUser)
// PORT SETUP

const PORT = 4000;
