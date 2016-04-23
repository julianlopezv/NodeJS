
//NPM Significa dos cosas:
//    *Node Package Manager:  Herramienta para instalar los módulos (librerias) que necesitará nuestra app. En consola nos ubicamos en la carpeta
//                 del proyecto y ejecutamos npm install libreria. Esta será solicitada posteriormente por la app mediante un require().
//    *Node Package Module:   El modulo instalado con NPM.
//
//

//Module dependencies
var express = require('express');//Framework para crear aplicaciones web en Nodejs
var http = require('http');//No se instala con NPM porque es un modulo core (nativo) de Node. Permite la creación de aplicacciones C/S
var path = require('path');//También es un módulo core de Node. Se usa para manejar rutas de archivos. Generalmente proporciona métodos
              //para transformar y trabajar con Strings
var io = require('socket.io');//Se usará para las operaciones en tiempo real
var connections = 0;//Contará el número de usuarios conectados al servidor

var app = express();//Crea una aplicación Express
var server = http.createServer(app);//http://stackoverflow.com/questions/17696801/express-js-app-listen-vs-server-listen
io = io.listen(server);

// all environments
app.set('port', process.env.PORT || 3000);
//path.join une las rutas de sus parámetros para crear una sola ruta. La variable _dirname es propia de NodeJS y hace referencia al directorio
//actual de este archivo
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');//Formato del archivo que se mostrará en la vista. Es EJS para que se pueda renderizar desde el JS del server
app.use(require('stylus').middleware(path.join(__dirname, 'public')));//La aplicación usará Stylus que es un procesador de CSS
app.use(express.static(path.join(__dirname, 'public')));

//Permite imprimir y manejar los errores que se presenten a la hora de la ejecución del framework Express
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//En este método se interceptan las peticiones de tipo GET que se hagan sobre el servidor. El / indica la ruta que se "escuchará", en este
//caso es la raíz del servidor. El callback recibe los datos de la petición del cliente mediante la variable req y se envia la respuesta
//a este mediante la variable res
app.get('/', function(req, res){
  res.render('index', { title: 'Dibujemos' });
});

io.set('log level', 1);//Se adjunta la variable al socket (será para operaciones posteriores)

// Escuchamos conexiones entrantes
io.sockets.on('connection', function (socket) {
 
  connections++;//Se aumenta la variable cuando se conecte un cliente
  console.log('connected', connections);//Se imprime el numero de usuarios conectados

  //Se envia la cantidad de conexiones a todos los clientes
  socket.broadcast.emit('connections', {connections:connections});

  // Detectamos eventos de mouse
  socket.on('mousemove', function (data) {
  // transmitimos el movimiento a todos los clientes conectados
  socket.broadcast.emit('move', data);
  });

  //Accion a tomar cuando un cliente envía un mensaje
  socket.on('send message', function(data){
    //se envia el mensaje al socket cliente
    io.sockets.emit('new message', {msg: data});
  });

  //Accion a tomar cuando un cliente se desconecta
  socket.on('disconnect', function() {
    connections--;
    console.log('connected', connections);
    //Se envia la cantidad de conexiones a todos los clientes
    socket.broadcast.emit('connections', {connections:connections});
  });

});

//Se arranca el servidor pasándole el puerto por el cual se escuchará y un callback que confirme por consola lo ocurrido con el servidor
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


