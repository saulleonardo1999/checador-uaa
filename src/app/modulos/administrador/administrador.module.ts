import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { AdministradorEmpleadosComponent } from './administrador-empleados/administrador-empleados.component';
import { AdministradorEmpleadosAltaComponent } from './administrador-empleados/administrador-empleados-alta/administrador-empleados-alta.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { AgmCoreModule } from '@agm/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AdminDrawerComponent } from './admin-drawer.component';
import { AdministradorHorarioComponent } from './administrador-horario/administrador-horario.component';

@NgModule({
  declarations: [AdministradorEmpleadosComponent, AdministradorEmpleadosAltaComponent, AdminDrawerComponent, AdministradorHorarioComponent],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    NgxChartsModule,
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
  ]
})
export class AdministradorModule { }
