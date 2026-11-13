import { Routes } from '@angular/router';
import { Principal } from './page/principal/principal';
import {Administracion} from './page/administracion/administracion';
import {Recepcion} from './page/recepcion/recepcion';
import {Tecnico} from './page/tecnico/tecnico';
import {Calidad} from './page/calidad/calidad';
import {Almacen} from './page/almacen/almacen';
import { ClienteFormComponent } from './page/cliente/cliente';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'principal',
    pathMatch: 'full'
  },
  {
    path: 'principal',
    component: Principal 
  },
  {
    path: 'cliente',
    component: ClienteFormComponent 
  }
  ,
  {
    path: 'administracion',
    component: Administracion
  },
  {
    path: 'recepcion',
    component: Recepcion
  },
  {
    path: 'tecnico',
    component: Tecnico
  },
  { 
    path: 'calidad',
    component: Calidad
  },
  {
    path: 'almacen',
    component: Almacen
  }

];