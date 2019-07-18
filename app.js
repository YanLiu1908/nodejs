
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , fs = require('fs');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);




app.get('/index.html', function (req, res) {
res.sendfile("index.html");
});

app.get('/getUserInfo', function (req, res) {

var response = {
    "first_name":req.body.first_name,
    "last_name":req.body.last_name
};
console.log(response);
res.send(JSON.stringify(response));
});

app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
});


var user = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
};

app.post('/addUser', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse(data);
       data.user4 = user.user4;
       console.log(data);
       res.end( JSON.stringify(data));
   });
});

app.get('/:id', function (req, res) {
	   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
	       data = JSON.parse( data );
	       var user = data["user" + req.params.id];
	       console.log( user );
	       res.end( JSON.stringify(user));
	   });
	});

http.createServer(app).listen(app.get('port'), function(){
	  console.log('Express server listening on port ' + app.get('port'));
	});