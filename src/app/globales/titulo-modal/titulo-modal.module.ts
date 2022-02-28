import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TituloModalComponent } from './titulo-modal.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [TituloModalComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [TituloModalComponent]
})
export class TituloModalModule { }