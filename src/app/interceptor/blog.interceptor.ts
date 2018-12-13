import { Injectable, ReflectiveInjector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, from } from "rxjs";
import { catchError } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpRequestService } from '../http-request.service';
import { Router } from '@angular/router';

@Injectable()
export class BlogInterceptor implements HttpInterceptor {

    constructor(private message: NzMessageService, private httpService: HttpRequestService, private router: Router) {

    }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var authReq = req.clone({
            headers: req.headers
        });
        if (this.httpService.getToken()) {
            authReq = req.clone({
                headers: req.headers.set('Authorization', this.httpService.getToken())
            });
        }
        return next.handle(authReq)
            .pipe(
                mergeMap((event: any) => {
                    if (event instanceof HttpResponse) {
                        if (event.status != 200) {
                            this.message.error(event.body.msg);
                        }
                       

                    }
                    return Observable.create(observer => observer.next(event)); //请求成功返回响应
                }),
                catchError((error, caught) => {
                    if (error.status == 417) {
                        this.httpService.setToken(null);
                        this.router.navigateByUrl("/login");
                    }
                    this.message.error(error.error.message);
                    return Observable.create(error);
                })) as any;
    }
}