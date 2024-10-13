<template>
  <div class="row mt-3">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-header bg-dark text-white text-center">
          Registrar Nuevo Estudiante
        </div>
        <div class="card-body">
          <form v-on:submit="guardar">
            <div>
              <img v-if="this.foto" height="100" :src="this.foto" id="fotoimg" class="img-thumbnail" alt="">
              <img v-else height="100" src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-256.png"
                 id="fotoimg" class="img-thumbnail" alt="">
            </div>

            <div class="input-group mb-3">

              <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
              <input type="text" v-model="nombre" id="nombre" placeholder="Ingrese el nombre"  maxlength="50" class="form-control">
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
              <input type="text" v-model="apellido" id="apellido" placeholder="Ingrese el apellido"  maxlength="50" class="form-control">
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
              <input v-on:change="previsualizarfoto" type="file" accept="image/png , image/jpg" id="foto" placeholder="Ingrese la foto"
                maxlength="50" class="form-control">
            </div>
            <div class="d-grid col-6 mx-auto mb-3">
              <button type="submit" class="btn btn-success"><i class="fa-solid fa-floppy-disk"></i> Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mostrarAlerta, enviarSolicitud } from '../funciones.js';

export default {
  data() {
    return {
      nombre: '',
      apellido: '',
      foto: '',
      url: 'http://127.0.0.1:8000/api/v1/posts/estudiantes',
      cargando: false,
    };
  },
  methods: {
    guardar() {
      event.preventDefault();
      var mifoto = document.getElementById("fotoimg");

      this.foto = mifoto.src;
      if(this.nombre.trim() == ''){
        mostrarAlerta('Ingrese un nombre', 'warning','nombre');
      }else if(this.apellido.trim() == ''){
        mostrarAlerta('Ingrese un apellido', 'warning','apellido');

      }else{
        var parametros = {
          nombre: this.nombre.trim(),
          apellido: this.apellido.trim(),
          foto: this.foto.trim(),
        };
        enviarSolicitud('POST', parametros, 'http://localhost:8000/api/v1/estudiantes', 'Estudiante registrado exitosamente');
      }
    },
    previsualizarfoto(event) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => { // Usar arrow function para mantener el contexto de `this`
        var mifoto = document.getElementById("fotoimg");
        mifoto.src = reader.result;
        this.foto =mifoto.src;
      };
    }
  }
};
</script>
