const express = require('express') ; 
var argv = require('minimist')(process.argv.slice(2)) ; 
const path = require('path') ; 
const bodyParser = require('body-parser') ; 
const cors = require('cors'); 
const passport = require('passport');
const mongoose = require('mongoose') ;
const config = require('./config/database');

mongoose.connect(config.database); 

mongoose.connection.on('connected' , () => {
	console.log('Successfuly connected to' +config.database) ; 
})

mongoose.connection.on('error' , (err) => {
	console.log('database error' +err) ; 
})

var app = express();
var subpath = express();

const users = require('./routes/users');
const procs = require('./routes/procs');
var swagger = require('swagger-node-express').createNew(subpath);





app.use(cors());
app.use(express.static('dist'));
app.use(bodyParser.json());
app.use("/v1" , subpath) ; 
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users' , users) ; 
app.use('/procs' , procs) ;


app.get('/' , (req , res) => {
	res.send('Invalid Endpoint') ; 
})

app.get('/' , (req , res ) => {
	res.send('Invalid Endpoint') ; 
})



swagger.setApiInfo({
	    title: "Monitoring Js Console API",
	    description: "API to do expose services",
	    termsOfServiceUrl: "",
	    contact: "redakourdi3@gmail.com",
	    license: "",
	    licenseUrl: ""
	});

app.get('/', function (req, res) {
	    res.sendFile(__dirname + '/dist/index.html');
	});

		// Set api-doc path
	swagger.configureSwaggerPaths('', 'api-docs', '');

	// Configure the API domain
	var domain = 'localhost';
	if(argv.domain !== undefined)
	    domain = argv.domain;
	else
	    console.log('No --domain=xxx specified, taking default hostname "localhost".')

	// Configure the API port
	const port = 3000;
	if(argv.port !== undefined)
	    port = argv.port;
	else
	    console.log('No --port=xxx specified, taking default port ' + port + '.')

	// Set and display the application URL
	var applicationUrl = 'http://' + domain + ':' + port;
	console.log('snapJob API running on ' + applicationUrl);


	app.listen(port , () => {
		console.log('Server started on port' +port) ; 
	}) ; 

	swagger.setAppHandler(app); 
	swagger.configure(applicationUrl, '1.0.0');

	
