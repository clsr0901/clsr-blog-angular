import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  baseUrl = 'http://localhost:8080';
  private token: string;
  setToken(token: string): void {
    this.token = token;
  }
  getToken(): string {
    return this.token;
  }
  setHeaders() {
    const headers = new HttpHeaders().set('Accept', 'application/json').set('Content-Type', 'application/json');
    let options = {
      headers: headers
    }
    return options;
  }

  constructor(private httpClient: HttpClient) { }

  httpPost(reqUrl: string, repBody): Observable<any> {
    return this.httpClient.post(this.baseUrl + reqUrl, repBody, this.setHeaders());
  }

  httpGet(reqUrl: string): Observable<any> {
    return this.httpClient.get(this.baseUrl + reqUrl, this.setHeaders());
  }
}
