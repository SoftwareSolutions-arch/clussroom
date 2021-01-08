import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class UtilService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(public snackBar: MatSnackBar,) { }


  //error message
  openSnackBar(message) {
    this.snackBar.open(message, 'Try again', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  // success message
  openSnackBarSuccess(message) {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }


  // success alert

  successAlert(msg){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: msg,
      showConfirmButton: false,
      timer: 5000

    })
  }

  errorAlert(msg){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: msg
    })
  }
}
