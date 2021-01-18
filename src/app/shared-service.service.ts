import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  baseurl = "https://classroom.auxesisdevelopment.com/api";
  baseUrl = 'https://lingolista.auxesisdevelopment.com/api/'
  constructor(public http: HttpClient) { }

  getRecordList(params, header) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseurl + "/vendor-registration", params, header).subscribe(
        res => {
          if (res['success'] != 0) {
            resolve(res);
          }
          else {
            reject(res);
          }
        },
        err => {
          reject(err);
        }
      );
    });
  }

  // get subscription details
  getSubscriptionList(params, header) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseurl + "/vendor-registration", params, header).subscribe(
        res => {
          if (res['success'] != 0) {
            resolve(res);
          }
          else {
            reject(res);
          }
        },
        err => {
          reject(err);
        }
      );
    });
  }

  // get subscription details
  getInvoiceList(params, header) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseurl + "/vendor-registration", params, header).subscribe(
        res => {
          if (res['success'] != 0) {
            resolve(res);
          }
          else {
            reject(res);
          }
        },
        err => {
          reject(err);
        }
      );
    });
  }

  // get subscription details
  postInvoiceDetails(params, header) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseurl + "/vendor-registration", params, header).subscribe(
        res => {
          if (res['success'] != 0) {
            resolve(res);
          }
          else {
            reject(res);
          }
        },
        err => {
          reject(err);
        }
      );
    });
  }

  // set password
  setPassword(params, header) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseurl + "/create-password-api", params, header).subscribe(
        res => {
          if (res['success'] != 0) {
            resolve(res);
          }
          else {
            reject(res);
          }
        },
        err => {
          reject(err);
        }
      );
    });
  }

  getInstructionList(header) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseurl + "/instruction-name-list-api", header).subscribe(
        res => {
          if (res['success'] != 0) {
            resolve(res);
          }
          else {
            reject(res);
          }
        },
        err => {
          reject(err);
        }
      );
    });
  }

  // login functionality
  doLogin(params, header) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseurl + "/user/login", params, header).subscribe(
        res => {
          if (res['success'] != 0) {
            resolve(res);
          }
          else {
            reject(res);
          }
        },
        err => {
          reject(err);
        }
      );
    });
  }

  doLogout(header) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseurl + "/user-logout-api", header).subscribe(
        res => {
          if (res['success'] != 0) {
            resolve(res);
          }
          else {
            reject(res);
          }
        },
        err => {
          reject(err);
        }
      );
    });
  }

  //step first for reset password
  getforgotPassword(params, header) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseurl + "/forget-password-api", params, header).subscribe(
        res => {
          if (res['success'] != 0) {
            resolve(res);
          }
          else {
            reject(res);
          }
        },
        err => {
          reject(err);
        }
      );
    });
  }

  //step second for reset password
  postOtp(params, header) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseurl + "/forget-password-api", params, header).subscribe(
        res => {
          if (res['success'] != 0) {
            resolve(res);
          }
          else {
            reject(res);
          }
        },
        err => {
          reject(err);
        }
      );
    });
  }

  // view all courses list
  viewAllCourses(header) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseurl + "/view-all-courses-api", header).subscribe(
        res => {
          if (res['success'] != 0) {
            resolve(res);
          }
          else {
            reject(res);
          }
        },
        err => {
          reject(err);
        }
      );
    });
  }

  //step third for reset password
  submitPassword(params, header) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseurl + "/forget-password-api", params, header).subscribe(
        res => {
          if (res['success'] != 0) {
            resolve(res);
          }
          else {
            reject(res);
          }
        },
        err => {
          reject(err);
        }
      );
    });
  }

  post(endPoint, data, isHeader): Observable<any> {
    let httpOptions;
    if (isHeader === 0) {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      };
      return this.http.post(this.baseUrl + endPoint, data, httpOptions);
    } else if (isHeader === 1) { //method with token
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-CSRF-Token': sessionStorage.getItem('token')
        })
      }
      return this.http.post(this.baseUrl + endPoint, data, httpOptions);
    }
  }
}