import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  baseurl = "https://classroom.auxesisdevelopment.com/api/";
  constructor(public http: HttpClient) { }

  // post  method
  post(endPoint, data, isHeader): Observable<any> {
    let httpOptions;
    if (isHeader === 0) {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        })
      };
      return this.http.post(this.baseurl + endPoint, data, httpOptions);
    } else if (isHeader === 1) { //method with token
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'X-CSRF-Token': sessionStorage.getItem('token')
        })
      }
      return this.http.post(this.baseurl + endPoint, data, httpOptions);
    }
  }

  // get method
  get(endPoint, isHeader): Observable<any> {
    let httpOptions;
    if (isHeader === 0) {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      };
      return this.http.get(this.baseurl + endPoint, httpOptions);
    } else if (isHeader === 1) {  //method with token
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-CSRF-Token': sessionStorage.getItem('token')
        })
      }
      return this.http.get(this.baseurl + endPoint, httpOptions);
    }
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
}