document.write("<h1><strong>Hola compañeros Desarrollo Aplicaciones Empresariales.</strong></h1>")

window.onload = function() {
     document.getElementById('name').onclick=whatIsYourName;
}

function openGoogle(){
    window.open("http://www.google.com/");
}

function whatIsYourName(){
    var name = prompt('Cual es tu nombre?');
    document.getElementById('nameRegister').value = name
}

var checkCedula = function(){
    numChar = document.getElementById('numeroCedula').value
    var count = (numChar.match(/is/g) || []).length;
    console.log(count);
    console.log(numChar);
    if ((numChar.length > 10 ) || (numChar == "") || (numChar.length < 10)){
        alert('Numero de cedula no valido');
    } else {
        alert('Numero de cedula valido');
    }
}


