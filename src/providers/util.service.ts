import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import Swal from 'sweetalert2'

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

  // error message through alert
  errorAlertPopup(msg) {
    Swal.fire({
      title: 'Error',
      text: msg,
    })
  }

  // success message through alert
  showSuccessAlert(msg){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: msg,
      showConfirmButton: false,
      timer: 1500
    })
  }
}
