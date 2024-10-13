import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NewEstudiante from '../views/EstudianteNew.vue'
import Estudiante_edit from '../views/Estudiante_edit.vue'
import ListaEstudiantes from '../views/ListaEstudiantes.vue'
import EliminarEst from '../views/EliminarEst.vue'
import ViewEstudiante from '../views/ViewEstudiante.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/crear',
    name: 'Crear',
    component: NewEstudiante
  },
  {
    path: '/view/:id',
    name: 'Ver',
    component: ViewEstudiante
  },
  {
    path: '/edit/:id',
    name: 'Editar',
    component: Estudiante_edit
  },
  {
    path: '/ver',
    name: 'Ver',
    component: HomeView
  },
  {
    path: '/eliminar/:id',
    name: 'Eliminar',
    component: EliminarEst
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
