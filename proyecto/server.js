console.log('Inicio el servidor');

//npm install express --save
var express = require('express');
var app = express();

var PUERTO = 3777;

app.listen(PUERTO, function(){
	console.log('Puerto: ' + PUERTO + ' escuchando');
});

app.get('/', function(req, res){
	res.send('Bienvenido al sistema');
});

//npm install body-parser
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

//localhost:3777/post
//PostMAN
app.post('/post', function(req, res){
	console.log(req.body);
	res.send('OK');
});

//npm install pg
//https://customer.elephantsql.com/instance
// julianlopezv Account GitHUB
// URL: postgres://kdrzvtgn:4UMaM5Bd5hjwDareLEgH2k2yKl1814pn@pellefant.db.elephantsql.com:5432/kdrzvtgn

var URL = 'postgres://kdrzvtgn:4UMaM5Bd5hjwDareLEgH2k2yKl1814pn@pellefant.db.elephantsql.com:5432/kdrzvtgn';

// BD_TEST
// Database: kdrzvtgn
var DATABASE = 'kdrzvtgn';
// User: kdrzvtgn
var USER = 'kdrzvtgn';
// Pass: 4UMaM5Bd5hjwDareLEgH2k2yKl1814pn
var PASS = '4UMaM5Bd5hjwDareLEgH2k2yKl1814pn';
// CREATE TABLE saldos(cedula INT PRIMARY KEY NOT NULL, nombre TEXT, dinero REAL);

var pg = require('pg');

var clientdb = new pg.Client(URL);

clientdb.connect(function(err){
	if(err){
		return console.log('Error URL DB');
	}
	console.log('Conectado a la DB');
	clientdb.end();
});

app.post('/api/insertar', function(req, res){
    var cedula = req.body.cedula;
    var nombre = req.body.nombre;
    var dinero = req.body.dinero;
    
    var queryInsertar = 'INSERT INTO saldo VALUES('
                + cedula + ', '
                + '\'' + nombre + '\', '
                + dinero + ');'
    console.log(queryInsertar);
    
    pg.connect(URL, function(err, client, done){
        if (err){
            res.send('Error :(');
            return console.log('Error de conexión');
        }
        client.query(queryInsertar, function(err, result){
            if(err){
                res.send('Error :(');
                client.end();
                return console.log('Error en el query');
            }
            console.log('Se insertó');
            res.send('OK c:');
            client.end();
        });
    });
});



