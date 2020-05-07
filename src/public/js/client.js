$(document).ready(function() {
    //alert('Welcome to developerZone, a place to developers from Universidad Agraria del Ecuador ');
    console.log('Está funcionando la opcion del cliente');
    const button = document.getElementById('BtnSubmitForm');
    let first_pass = document.getElementsByName('password');
    console.log('primera clave: ' + $('#inputPass').val());
    console.log('segunda clave, o sea la de confirmación: ' + $('#inputPass2').val());
    $('#FormSignup').submit(function(event) {
        event.preventDefault();
        const datas = {
            'primera clave': first_pass
        };
        console.log('el objeto de datos es => ', datas);

    });


});