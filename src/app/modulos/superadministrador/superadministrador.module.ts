import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperadministradorRoutingModule } from './superadministrador-routing.module';
import { SuperadministradorDrawerComponent } from './superadministrador-drawer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { SuperadminsitradorOtrosComponent } from './superadminsitrador-otros/superadminsitrador-otros.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SuperadministradorOtrosAltaComponent } from './superadminsitrador-otros/superadministrador-otros-alta/superadministrador-otros-alta.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SuperadministradorOtrosCambioComponent } from './superadminsitrador-otros/superadministrador-otros-cambio/superadministrador-otros-cambio.component';
import { SuperadministradorEmpresasComponent } from './superadministrador-empresas/superadministrador-empresas.component';
import { AgmCoreModule } from '@agm/core';
import { SuperadministradorEmpresasAltaComponent } from './superadministrador-empresas/superadministrador-empresas-alta/superadministrador-empresas-alta.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SuperadministradorEmpresasUbicacionesComponent } from './superadministrador-empresas/superadministrador-empresas-ubicaciones/superadministrador-empresas-ubicaciones.component';
import { SuperadministradorAdministradoresComponent } from './superadministrador-administradores/superadministrador-administradores.component';
import { SuperadministradorAdministradoresAltaComponent } from './superadministrador-administradores/superadministrador-administradores-alta/superadministrador-administradores-alta.component';
import { SuperadministradorAdministradoresCambioComponent } from './superadministrador-administradores/superadministrador-administradores-cambio/superadministrador-administradores-cambio.component';
import { MatSelectModule } from '@angular/material/select';
import { SuperadministradorSuscripcionComponent } from './superadministrador-suscripcion/superadministrador-suscripcion.component';
import { SuperadministradorSuscripcionAltaComponent } from './superadministrador-suscripcion/superadministrador-suscripcion-alta/superadministrador-suscripcion-alta.component';
import { SuperadministradorSuscripcionCambioComponent } from './superadministrador-suscripcion/superadministrador-suscripcion-cambio/superadministrador-suscripcion-cambio.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
@NgModule({
  declarations: [SuperadministradorDrawerComponent, SuperadminsitradorOtrosComponent, SuperadministradorOtrosAltaComponent, SuperadministradorOtrosCambioComponent, SuperadministradorEmpresasComponent, SuperadministradorEmpresasAltaComponent, SuperadministradorEmpresasUbicacionesComponent, SuperadministradorAdministradoresComponent, SuperadministradorAdministradoresAltaComponent, SuperadministradorAdministradoresCambioComponent, SuperadministradorSuscripcionComponent, SuperadministradorSuscripcionAltaComponent, SuperadministradorSuscripcionCambioComponent],
  imports: [
    NgxChartsModule,
    CommonModule,
    SuperadministradorRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatSidenavModule,
    MatMenuModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBKqQundPuHZAI1GFKKo9xpuxPa3QNI97k'
    }),
  ],

})
export class SuperadministradorModule { }
