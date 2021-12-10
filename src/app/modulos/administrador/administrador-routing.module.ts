import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministradorEmpleadosComponent } from './administrador-empleados/administrador-empleados.component';
import { AdministradorHorarioComponent } from './administrador-horario/administrador-horario.component';
import { AdminDrawerComponent } from './admin-drawer.component';
const routes: Routes = [
  {
    path: '',
    component: AdminDrawerComponent,
    children:[
      {
        path: 'empleados',
        component: AdministradorEmpleadosComponent
      },
      {
        path: 'horario',
        component: AdministradorHorarioComponent
      },
      {
        path: '**',
        redirectTo: 'empleados',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }

