var http = require("http");
var modulo = require("./modulo");
var _suma = modulo.suma(5, 6);

http.createServer(function(request, response){
	response.write("Hola Mundo<br>");
	response.write("Suma: " + _suma);
	console.log("Server working...");
	response.end();
}).listen(8888);
