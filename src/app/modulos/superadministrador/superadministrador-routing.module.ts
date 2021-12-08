import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuperadministradorAdministradoresComponent } from './superadministrador-administradores/superadministrador-administradores.component';
import { SuperadministradorDrawerComponent } from './superadministrador-drawer.component';
import { SuperadministradorEmpresasComponent } from './superadministrador-empresas/superadministrador-empresas.component';
import { SuperadministradorSuscripcionComponent } from './superadministrador-suscripcion/superadministrador-suscripcion.component';
import { SuperadminsitradorOtrosComponent } from './superadminsitrador-otros/superadminsitrador-otros.component';


const routes: Routes = [
  {
    path: '',
    component: SuperadministradorDrawerComponent,
    children:[
      {
        path: 'otros',
        component: SuperadminsitradorOtrosComponent
      },
      {
        path: 'empresas',
        component: SuperadministradorEmpresasComponent
      },
      {
        path: 'administradores',
        component: SuperadministradorAdministradoresComponent
      },
      {
        path: 'suscripcion',
        component: SuperadministradorSuscripcionComponent
      },
      {
        path: '**',
        redirectTo: 'empresas',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadministradorRoutingModule { }
