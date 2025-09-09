document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('appointment-form');
    const confirmation = document.getElementById('confirmation');
    const confirmationDetails = document.getElementById('confirmation-details');
    
    // Cargar servicios desde localStorage o usar defaults
    let servicios = JSON.parse(localStorage.getItem('servicios')) || [
        { id: 'limpieza', nombre: 'Limpieza dental', precio: 80000 },
        { id: 'blanqueamiento', nombre: 'Blanqueamiento', precio: 250000 },
        { id: 'ortodoncia', nombre: 'Ortodoncia', precio: 3000000 },
        { id: 'extraccion', nombre: 'Extracción', precio: 120000 },
        { id: 'calza', nombre: 'Calza (obturación)', precio: 150000 }
    ];
    
    // Cargar citas existentes
    let citas = JSON.parse(localStorage.getItem('citas')) || [];
    
    // Función para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Función para validar teléfono
    function isValidPhone(phone) {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phone);
    }
    
    // Función para verificar disponibilidad de fecha y hora
    function isDateTimeAvailable(selectedDate, selectedTime) {
        return !citas.some(cita => 
            cita.fecha === selectedDate && cita.hora === selectedTime
        );
    }
    
    // Función para mostrar notificación
    function showNotification(message, isSuccess = true) {
        alert(message);
    }
    
    // Manejar envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores del formulario
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const service = document.getElementById('service').value;
        
        // Validaciones
        if (!name || !email || !phone || !date || !time || !service) {
            showNotification('Por favor, complete todos los campos.', false);
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Por favor, ingrese un email válido.', false);
            return;
        }
        
        if (!isValidPhone(phone)) {
            showNotification('El teléfono debe tener 10 dígitos.', false);
            return;
        }
        
        if (!isDateTimeAvailable(date, time)) {
            showNotification('La fecha y hora seleccionadas no están disponibles. Por favor elija otra.', false);
            return;
        }
        
        // Crear objeto cita
        const cita = {
            id: Date.now(),
            nombre: name,
            email: email,
            telefono: phone,
            fecha: date,
            hora: time,
            servicio: service,
            fechaCreacion: new Date().toISOString()
        };
        
        // Guardar cita
        citas.push(cita);
        localStorage.setItem('citas', JSON.stringify(citas));
        
        // Mostrar confirmación
        const servicioSeleccionado = servicios.find(s => s.id === service);
        confirmationDetails.innerHTML = `
            <strong>Nombre:</strong> ${name}<br>
            <strong>Email:</strong> ${email}<br>
            <strong>Teléfono:</strong> ${phone}<br>
            <strong>Fecha:</strong> ${new Date(date).toLocaleDateString('es-ES')}<br>
            <strong>Hora:</strong> ${time}<br>
            <strong>Servicio:</strong> ${servicioSeleccionado ? servicioSeleccionado.nombre : service}<br>
            <strong>Código de reserva:</strong> #${cita.id}
        `;
        
        confirmation.style.display = 'block';
        form.reset();
        
        showNotification('¡Cita reservada exitosamente! Su código de reserva es #' + cita.id);
    });
    
    // Validación en tiempo real
    document.getElementById('email').addEventListener('blur', function() {
        if (this.value && !isValidEmail(this.value)) {
            this.style.borderColor = 'red';
        } else {
            this.style.borderColor = '#ddd';
        }
    });
    
    document.getElementById('phone').addEventListener('blur', function() {
        if (this.value && !isValidPhone(this.value)) {
            this.style.borderColor = 'red';
        } else {
            this.style.borderColor = '#ddd';
        }
    });
    
    // Cargar servicios en el select
    const serviceSelect = document.getElementById('service');
    servicios.forEach(servicio => {
        const option = document.createElement('option');
        option.value = servicio.id;
        option.textContent = `${servicio.nombre} - $${servicio.precio.toLocaleString()}`;
        serviceSelect.appendChild(option);
    });
});
