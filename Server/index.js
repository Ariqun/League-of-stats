const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const exphbs = require('express-handlebars');
const homeRoute = require('./routes/home');
// const summonerRoute = require('./routes/summoner');


const app = express();
const hbs = exphbs.create({
	defaultLayout: 'main',
	extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use('/', homeRoute);
// app.use('/summoner', summonerRoute);

async function start() {
	try {
		const url = 'mongodb+srv://Ariqun:JdPwllLUl9VVSksa@los.5xgxi.mongodb.net/los';
		const PORT = process.env.PORT || 3001;
		
		await mongoose.connect(url, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});

		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}...`);
		});
	} catch(e) {
		console.log(e);
	}
}
start();