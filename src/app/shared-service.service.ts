import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  baseurl = "https://classroom.auxesisdevelopment.com/api/";
  tempUrl = "https://api.countrystatecity.in/v1/"
  constructor(public http: HttpClient) { }

  // post  method
  post(endPoint, data, isHeader): Observable<any> {
    var authKey = localStorage.getItem('Authorization');

    let httpOptions;
    if (isHeader === 0) {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }),
      };
      return this.http.post(this.baseurl + endPoint, data, httpOptions);
    } else if (isHeader === 1) { //method with token
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'X-CSRF-Token': localStorage.getItem('csrftoken'),
          'Authorization': authKey
        }),
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
          'X-CSRF-Token': sessionStorage.getItem('token'),
          'Authorization': localStorage.getItem('Authorization')
        })
      }
      return this.http.get(this.baseurl + endPoint, httpOptions);
    }
  }

  getData(endPoint): Observable<any> {
    let httpOptions;
    httpOptions = {
      headers: new HttpHeaders({
        'X-CSCAPI-KEY': 'UDJMdHl1NktVZk95U2NlNkFvOHFKNmdIYnhPVGRDbEJya1gxT2VVYg=='
      }),
    };
    return this.http.get(this.tempUrl + endPoint, httpOptions);
  }
}