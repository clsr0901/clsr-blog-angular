import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  setHeaders(){
    const headers = new HttpHeaders().set('Accept', 'application/json').set('Content-Type', 'application/json');
  let options = {
    headers: headers
    // headers: new HttpHeaders({ 'Content-Type': 'application/json;application/x-www-form-urlencodeed; charset=utf-8' })
  }
  return options;
  }

  constructor(private httpClient: HttpClient) { }

  httpPost(reqUrl : string, repBody, comp, flag) {
    this.httpClient.post(reqUrl, repBody, this.setHeaders())
      .subscribe(val => {
        console.log("post success", val);
        if(val['success']){
          comp.postOk(val, flag);
        }else{
          comp.postError(val, flag);
        }
      },
      error => {
        console.log("post error", error);
        comp.postError(error, flag);
      })
  }

  httpGet(reqUrl: string, comp, flag){
    this.httpClient.get(reqUrl, this.setHeaders())
    .subscribe(val => {
      console.log("get success", val);
      if(val['success']){
        comp.getOk(val, flag);
      }else{
        comp.getError(val, flag);
      }
    }, 
    error =>{
      console.log("get error", error);
      comp.getError(error, flag);
    })
  }
}
