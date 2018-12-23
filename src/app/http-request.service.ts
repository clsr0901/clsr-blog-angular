import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from './entity/User';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  // baseUrl = 'http://localhost:8080';
  baseUrl = '';


  setToken(token: string): void {
    localStorage.setItem('token', token);
  }
  getToken(): string {
    return localStorage.getItem('token');
  }
  setUser(user: User): void{
    localStorage.setItem('user', JSON.stringify(user));
  }
  getUser(): User{
    return JSON.parse(localStorage.getItem('user'));
  }
  
  setHeaders() {
    const headers = new HttpHeaders().set('Accept', 'application/json').set('Content-Type', 'application/json');
    let options = {
      headers: headers
    }
    return options;
  }

  constructor(private httpClient: HttpClient) { }

  httpPut(reqUrl: string, repBody): Observable<any> {
    return this.httpClient.put(this.baseUrl + reqUrl, repBody, this.setHeaders());
  }

  httpDelete(reqUrl: string): Observable<any> {
    return this.httpClient.delete(this.baseUrl + reqUrl, this.setHeaders());
  }

  httpPost(reqUrl: string, repBody): Observable<any> {
    return this.httpClient.post(this.baseUrl + reqUrl, repBody, this.setHeaders());
  }

  httpGet(reqUrl: string): Observable<any> {
    return this.httpClient.get(this.baseUrl + reqUrl, this.setHeaders());
  }
}
