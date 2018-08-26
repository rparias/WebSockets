(function(window, document, JSON){
    'use strict';
    
    //en ves de poner localhost:8080 o la direccion actual va el window
    var url = 'ws://'+ window.location.host +'/Chat/chat',
        ws = new WebSocket(url),
        mensajes = document.getElementById('conversacion'),
        boton = document.getElementById('btnEnviar'),
        nombre = document.getElementById('usuario'),
        mensaje = document.getElementById('mensaje');
        
    ws.onopen = onOpen;
    ws.onclose = onClose;
    ws.onmessage = onMessage;
    boton.addEventListener('click', enviar);
    
    function onOpen() {
        console.log('Conectado...');
    }
    
    function onClose() {
        console.log('Desconectado...');
    }
    
    function enviar() {
        var msg = {
            nombre: nombre.value,
            mensaje: mensaje.value
        };
        
        //convierto el msg a JSON para enviarlo
        ws.send(JSON.stringify(msg));
    }
    
    function onMessage(evt){
        var obj = JSON.parse(evt.data),
            msg = 'Nombre: '+obj.nombre+' dice: '+obj.mensaje;
        mensajes.innerHTML += '<br/>'+msg;
    }
    
})(window, document, JSON);