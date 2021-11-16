import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutenticacionAdministradorComponent } from './autenticacion-administrador/autenticacion-administrador.component';
import { AutenticacionEmpleadoComponent } from './autenticacion-empleado/autenticacion-empleado.component';
import { AutenticacionSuperadministradorComponent } from './autenticacion-superadministrador/autenticacion-superadministrador.component';


const routes: Routes = [
  {
    path: '',
    children:[
      {
        path: 'superadministrador',
        component: AutenticacionSuperadministradorComponent
      },
      {
        path: 'administrador',
        component: AutenticacionAdministradorComponent
      },
      {
        path: 'empleado',
        component: AutenticacionEmpleadoComponent
      },
      {
        path: '**',
        redirectTo: 'empleado',
        pathMatch: 'full'
      },
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutenticacionRoutingModule { }
