document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formulario-cita');
    const confirmacion = document.getElementById('confirmacion');
    const detallesConfirmacion = document.getElementById('detalles-confirmacion');
    
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const fecha = document.getElementById('fecha').value;
        const hora = document.getElementById('hora').value;
        const servicio = document.getElementById('servicio').value;
        
        if (nombre && email && telefono && fecha && hora && servicio) {
            detallesConfirmacion.innerHTML = `
                <strong>Nombre:</strong> ${nombre}<br>
                <strong>Email:</strong> ${email}<br>
                <strong>Teléfono:</strong> ${telefono}<br>
                <strong>Fecha:</strong> ${fecha}<br>
                <strong>Hora:</strong> ${hora}<br>
                <strong>Servicio:</strong> ${servicio}
            `;
            
            confirmacion.style.display = 'block';
            formulario.reset();
            
            alert('¡Cita reservada exitosamente!');
        } else {
            alert('Por favor, complete todos los campos.');
        }
    });
});