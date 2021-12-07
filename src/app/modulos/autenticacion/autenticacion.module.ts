import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AutenticacionRoutingModule } from './autenticacion-routing.module';
import { AutenticacionSuperadministradorComponent } from './autenticacion-superadministrador/autenticacion-superadministrador.component';
import { AutenticacionAdministradorComponent } from './autenticacion-administrador/autenticacion-administrador.component';
import { AutenticacionEmpleadoComponent } from './autenticacion-empleado/autenticacion-empleado.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { AutenticacionErrorModalComponent } from './autenticacion-error-modal/autenticacion-error-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    AutenticacionSuperadministradorComponent,
    AutenticacionAdministradorComponent,
    AutenticacionEmpleadoComponent,
    AutenticacionErrorModalComponent
  ],
  imports: [
    // BrowserModule,
    CommonModule,
    AutenticacionRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatMenuModule,
  ],
})
export class AutenticacionModule { }
