import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpleadodrawerComponent } from './empleadodrawer.component';
import { EmpleadoEntradaComponent } from './empleado-entrada/empleado-entrada.component';
import { EmpleadoSalidaComponent } from './empleado-salida/empleado-salida.component';
import { EmpleadoHorariotrabajadoComponent } from './empleado-horariotrabajado/empleado-horariotrabajado.component';
const routes: Routes = [
  {
    path: '',
    component: EmpleadodrawerComponent,
    children:[
      {
        path: 'entradas',
        component: EmpleadoEntradaComponent
      },
      {
        path: 'salidas',
        component: EmpleadoSalidaComponent
      },
      {
        path: 'horario-trabajado',
        component: EmpleadoHorariotrabajadoComponent
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
export class EmpleadoRoutingModule { }
