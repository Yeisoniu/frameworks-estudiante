import Swal from 'sweetalert2';
import axios from 'axios';

export function mostrarAlerta(titulo, icono, foco='') {
  console.log('ID de foco:', foco);
  const elemento = document.getElementById(foco);
  console.log('Elemento encontrado:', elemento);
  
  if (foco !== '' && elemento) {
    elemento.focus();
  } else {
    console.error('Elemento no encontrado o foco vacío');
  }
  
  Swal.fire({
    title: titulo,
    icon: icono,
    customClass: {
      confirmButton: 'btn btn-success',
      popup: 'animated zoomIn'
    },
  });
}

export function confirmar(urlConSlash, id, titulo, mensaje) {
  if (!id) {
      console.error('ID no válido:', id);
      return; // Salir de la función si el ID no es válido
  }

  var url = urlConSlash.endsWith('/') ? urlConSlash + id : urlConSlash + '/' + id;

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success me-3',
      cancelButton: 'btn btn-danger'
    }
  });

  swalWithBootstrapButtons.fire({
    title: titulo,
    text: mensaje,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: '<i class="fa-solid fa-check"></i> Si eliminar',
    cancelButtonText: '<i class="fa-solid fa-ban"></i> Cancelar'
  }).then((res) => {
    if (res.isConfirmed) {
      enviarSolicitud('DELETE', { id: id }, url, 'Estudiante eliminado exitosamente');
    } else {
      mostrarAlerta('Operación cancelada', 'info');
    }
  }).catch(() => {
    mostrarAlerta('Error en la operación', 'error');
  });
}

export function enviarSolicitud(metodo, parametros, url, mensaje) {
  axios({
    method: metodo,
    url: url,
    data: parametros,
  })
  .then(function (res) {
    if (res.status === 200 || res.status === 201) {
      mostrarAlerta(mensaje, 'success');

      window.setTimeout(function () {
        window.location.href = '/';
      }, 1000);
    } else {
      mostrarAlerta('Error: ' + res.statusText, 'error'); // Manejo de otros estados
    }
  })
  .catch(function (error) {
    console.error('Error en la solicitud:', error);
    mostrarAlerta('Servidor no disponible', 'error');
  });
}
