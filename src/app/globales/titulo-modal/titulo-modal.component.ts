import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-titulo-modal',
  templateUrl: './titulo-modal.component.html',
  styleUrls: ['./titulo-modal.component.scss']
})
export class TituloModalComponent implements OnInit {
  @Input() titulo: string;
  @Input() referenciaModal: MatDialogRef<any>;
  @Output() eventoCerrarModal = new EventEmitter(true);
  constructor() { }

  ngOnInit(): void {
  }

  cerrarModal(): void {
    this.referenciaModal.close(null);
    this.eventoCerrarModal.emit(true);
  }
}