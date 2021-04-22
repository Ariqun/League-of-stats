const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const exphbs = require('express-handlebars');
const summonerRoute = require('./routes/summoner');
const sumMatchesRoute = require('./routes/sumMatches');
const sumMatchRoute = require('./routes/sumMatch');
const sumRankedRoute = require('./routes/sumRanked');


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
app.use('/', summonerRoute);
app.use('/', sumMatchesRoute);
app.use('/', sumMatchRoute);
app.use('/', sumRankedRoute);

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