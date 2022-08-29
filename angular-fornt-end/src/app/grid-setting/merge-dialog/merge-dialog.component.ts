import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MergeDialogData } from './merge-dialog.data';

@Component({
  selector: 'merge-dialog',
  templateUrl: './merge-dialog.component.html',
  styleUrls: ['./merge-dialog.component.scss']
})
export class MergeDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MergeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MergeDialogData,) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
