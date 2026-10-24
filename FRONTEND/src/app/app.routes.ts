import { Routes } from '@angular/router';
import { ClienteFormComponent } from './clientes/cliente-form/cliente-form';
export const routes: Routes = [
     {
    path: 'clientes',
    component: ClienteFormComponent
  },
  {
    path: '',
    redirectTo: 'clientes',
    pathMatch: 'full'
  }
];
