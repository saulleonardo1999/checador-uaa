import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuperadministradorDrawerComponent } from './superadministrador-drawer.component';
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
        path: '**',
        redirectTo: '',
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
