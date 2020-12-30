import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  baseurl = "https://classroom.auxesisdevelopment.com/api";

  constructor(public http: HttpClient) { }


  getRecordList(params, header) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseurl + "/test-post-api", params, header).subscribe(
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
      this.http.post(this.baseurl + "/test-post-api", params, header).subscribe(
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
      this.http.post(this.baseurl + "/test-post-api", params, header).subscribe(
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
      this.http.post(this.baseurl + "/test-post-api", params, header).subscribe(
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


  // set school name
  setSchool(params, header) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseurl + "/vendor-first-login-api", params, header).subscribe(
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
}
