import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperadministradorRoutingModule } from './superadministrador-routing.module';
import { SuperadministradorDrawerComponent } from './superadministrador-drawer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { SuperadminsitradorOtrosComponent } from './superadminsitrador-otros/superadminsitrador-otros.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SuperadministradorOtrosAltaComponent } from './superadminsitrador-otros/superadministrador-otros-alta/superadministrador-otros-alta.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SuperadministradorOtrosCambioComponent } from './superadminsitrador-otros/superadministrador-otros-cambio/superadministrador-otros-cambio.component';
@NgModule({
  declarations: [SuperadministradorDrawerComponent, SuperadminsitradorOtrosComponent, SuperadministradorOtrosAltaComponent, SuperadministradorOtrosCambioComponent],
  imports: [
    CommonModule,
    SuperadministradorRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    // BrowserModule,
    // AppRoutingModule,
    // BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
  ],

})
export class SuperadministradorModule { }
