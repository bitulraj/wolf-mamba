
let express = require('express');

let app = express();

let bodyParser = require('body-parser');

let ejs = require('ejs');

let fs = require('fs');

let Discord = require('discord.js');

let client = new Discord.Client();

let path = require('path');

app.use(express.static(path.join(__dirname, 'views')));

app.use(bodyParser.urlencoded({ extended: false}));

app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
	res.sendFile(__dirname + 'views/index.html');
})

app.get('/vip', (req, res)=>{
	res.render('vip');
})

app.post('/register', (req, res)=>{
	let { username, email, phone_no } = req.body;

	let data = username + '  :  ' + email + ' : ' + phone_no + '\n';

	fs.appendFile('views/data.txt', data, 'utf-8', (err)=>{
		if(err){
			throw err;
		}else{
			res.send("Your Data is sent Successfully! Kindly wait for sometime and till that time check out the cool Merchandise!!")
		}
	})
})

app.get('/order', (req, res)=>{
	res.render('order');
})

app.post('/order', (req, res)=>{
	let { username, email, phone_no, zipcode, landmark, city, house_no } = req.body;

	let cust_details = username + '  :  ' + email + ' : ' + phone_no + '  :  ' + zipcode + '  :  ' + landmark + ' : ' + city + '  :  ' + house_no + '\n';

	fs.appendFile('views/order.txt', cust_details, 'utf-8', (err)=>{
		if(err){
			throw err;
		}else{
			res.send("Your Data is sent Successfully! Kindly wait for sometime and till that time check out the cool Merchandise!!")
		}
	})
})

client.on('message', message=>{
	if(message.content == '$order'){
		fs.readFile('views/order.txt', 'utf-8', (err, result)=>{
			if(err){
				throw err;
			}else{
				message.channel.send(result);
			}
		})
	}

	if(message.content == '$vip'){
		fs.readFile('views/data.txt', 'utf-8', (err, result)=>{
			if(err){
				throw err;
			}else{
				message.channel.send(result);
			}
		})
	}
})

client.login('NjkzMzM1NzcxOTIyNDMyMDMw.XwVzug.6ZfctcG3vXNadRe__IDrnTf9xII');

let PORT = process.env.PORT | 5600;

app.listen(PORT, console.log('Running Port!'));