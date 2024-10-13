<template>
  <div class="row">
    <div class="col-lg-8 offset-lg-2">
      <div class="table-responsive">
        <br>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>Foto</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          
          <tbody class="table-group-divider" id="contenido">
            <tr v-if="cargando">
              <td colspan="7"><h3>Cargando....</h3></td>
            </tr>
            <tr v-else v-for="(est, i) in estudiantes" :key="est.id">
              <td v-text="i + 1"></td>
              <td v-text="est.id"></td>
              <td>
                  <img v-if="est.foto" style="width:150px !important;" :src="est.foto" class="img/-thumbnail" alt="">
                  <img v-else="est.foto" style="width:150px !important;" src="https://static.vecteezy.com/system/resources/previews/000/424/492/original/vector-users-icon.jpg">
                </td>
              <td v-text="est.nombre"></td>
              <td v-text="est.apellido"></td> 
              <td v-text="formatearFecha(est.created_at)"></td>
              <td>
                <router-link :to="{ path: 'viewE/' + est.id }" class="btn btn-info">
                  <i class="fa-solid fa-info"></i>
                </router-link>
                &nbsp;
                <router-link :to="{ path: 'editE/' + est.id }" class="btn btn-warning">
                  <i class="fa-solid fa-edit"></i>
                </router-link>
                &nbsp;
                <button class="btn btn-danger" @click="eliminar(est.id, est.nombre)">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>     
  </div>
</template>

<script>
import axios from 'axios';
import { confirmar } from '../funciones.js';

export default {
  data() {
    return {
      estudiantes: [],
      cargando: false
    };
  },
  mounted() {
    this.getEstudiantes();
  },
  methods: {
    async getEstudiantes() {
      this.cargando = true;
      try {
        const response = await axios.get('http://localhost:8000/api/v1/estudiantes');
        this.estudiantes = response.data.data;
      } catch (error) {
        console.error('Error al obtener estudiantes:', error);
      } finally {
        this.cargando = false;
      }
    },
    formatearFecha(fecha) {
      return new Date(fecha).toLocaleDateString('es-ES', {
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit'
      });
    },
    eliminar(id, nombre) {
      confirmar('http://localhost:8000/api/v1/estudiantes/', id, 'Eliminar Registro', '¿Realmente desea eliminar ?');
      this.cargando = false;
    }
  }
};
</script>
