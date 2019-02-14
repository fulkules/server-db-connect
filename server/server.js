require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const ctrl = require('./controller');
const massive = require('massive');

const app = express();

const {CONNECTION_STRING} = process.env
console.log(CONNECTION_STRING)

massive(CONNECTION_STRING).then((dbInstance) => {  
	app.set('db', dbInstance);
	console.log(`we are connected`)
})

app.use(bodyParser.json());


// ENDPOINTS

app.get('/api/all', (req, res) => { 
	const dbInstance = req.app.get('db');
	dbInstance.getAllUsers().then((response) => {
		res.send(response)
	})
})

app.get('/api/account/:id', (req, res) => {
	const dbInstance = req.app.get('db');
	const {id} = req.params;
	dbInstance.getSingleUser(id).then(response => {
		if(response[0]){
			res.status(200).send(response[0])
		} else {
			res.sendStatus(404)
		}
	})
})

app.post('/api/account', (req, res) => {
	const dbInstance = req.app.get('db');
	const {name, email} = req.body
	dbInstance.createUser(name, email).then(response => {
		res.status(201).send(response)
	})	
})




// PORT SETUP

const PORT = 4000;
app.listen(PORT, () => console.log(`Port ${PORT}, reporting for duty!`))