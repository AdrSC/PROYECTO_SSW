import { Routes } from '@angular/router';
import { Principal } from './page/principal/principal';
import { ClienteFormComponent } from './page/cliente/cliente';

export const routes: Routes = [
  {
    path: '',
    component: Principal 
  },
  {
    path: 'cliente',
    component: ClienteFormComponent 
  }
];