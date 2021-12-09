import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  
  {
    path: 'login',
    loadChildren: ()=> import('./modulos/autenticacion/autenticacion.module').then(m =>m.AutenticacionModule)
  },
  {
    path: 'superadministrador',
    loadChildren: ()=> import('./modulos/superadministrador/superadministrador.module').then(m =>m.SuperadministradorModule)
  },
  {
    path: 'administrador',
    loadChildren: ()=> import('./modulos/administrador/administrador.module').then(m =>m.AdministradorModule)
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
