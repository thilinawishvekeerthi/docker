import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";


@Injectable(
    {
        providedIn:'root'
    }
)
export class MessageService{
   
    constructor(private snackBar: MatSnackBar){
    }

    openSnackBar(message: string) {
        const horizontalPosition: MatSnackBarHorizontalPosition = 'center';
        const verticalPosition: MatSnackBarVerticalPosition = 'top';
        this.snackBar.open(message, 'close', {
          horizontalPosition: horizontalPosition,
          verticalPosition: verticalPosition,
        });
      }

}