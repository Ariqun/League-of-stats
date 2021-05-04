const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const exphbs = require('express-handlebars');

const summonerRoute = require('./routes/summoner');
const matchListRoute = require('./routes/matchList');
const matchRoute = require('./routes/match');
const rankedRoute = require('./routes/ranked');
const champStatisticsRoute = require('./routes/champStatistics');
const champRoute = require('./routes/champion');
const sumStatisticsRoute = require('./routes/sumStatistics');

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
app.use('/', matchListRoute);
app.use('/', matchRoute);
app.use('/', rankedRoute);
app.use('/', champStatisticsRoute);
app.use('/', champRoute);
app.use('/', sumStatisticsRoute);

async function start() {
	try {
		const url = 'mongodb://localhost:27017/LoS';
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