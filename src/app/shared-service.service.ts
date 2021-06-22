import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  baseurl = "https://classroom.auxesisdevelopment.com/api/";
  // tempUrl = "https://api.countrystatecity.in/v1/"
  tempUrl = "https://www.universal-tutorial.com/api/"
  private _yourComponentNameLoadedAlready: boolean;

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

  getData(endPoint,token): Observable<any> {
    let httpOptions;
    httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+token
      }),
    };
    return this.http.get(this.tempUrl + endPoint, httpOptions);
  }

  getAuthToken(endPoint): Observable<any> {
    let httpOptions;
    httpOptions = {
      headers: new HttpHeaders({
        'api-token': '9JGxGPezIYmnpGWJdScyI7Yembf01mN3J1Oh1NslbvkjtX4Vj6Q0eaBNRPfeoCypI-Q',
        'user-email': 'umangchopra833@gmail.com',
      }),
    };
    return this.http.get(this.tempUrl + endPoint, httpOptions);
  }



  public set YourComponentNameLoadedAlready(v: boolean) {
    this._yourComponentNameLoadedAlready = v;
  }

  public get YourComponentNameLoadedAlready(): boolean {
    return this._yourComponentNameLoadedAlready;
  }
  
}