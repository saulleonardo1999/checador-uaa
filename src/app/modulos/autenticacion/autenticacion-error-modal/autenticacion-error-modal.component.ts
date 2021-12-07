import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-autenticacion-error-modal',
  templateUrl: './autenticacion-error-modal.component.html',
  styleUrls: ['./autenticacion-error-modal.component.scss']
})
export class AutenticacionErrorModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AutenticacionErrorModalComponent>,
  ) { }

  ngOnInit(): void {
  }

  onDismiss(): void {
    this.dialogRef.close(null);
  }
}
