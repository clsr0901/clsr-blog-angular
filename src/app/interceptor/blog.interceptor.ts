import { Injectable, ReflectiveInjector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, from } from "rxjs";
import { catchError } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpRequestService } from '../http-request.service';

@Injectable()
export class BlogInterceptor implements HttpInterceptor {

    constructor(private message: NzMessageService, private httpService: HttpRequestService) {

    }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('token', this.httpService.getToken())
        var authReq = req.clone({
            headers: req.headers
        });
        if (this.httpService.getToken()) {
            console.log('ddd')
            authReq = req.clone({
                headers: req.headers.set('Authorization', this.httpService.getToken())
            });
        }
        console.log(req, '222')
        return next.handle(authReq)
            .pipe(
                mergeMap((event: any) => {
                    if (event instanceof HttpResponse) {
                        if (event.status != 200)
                            this.message.error(event.body.msg);
                    }
                    return Observable.create(observer => observer.next(event)); //请求成功返回响应
                }),
                catchError((error, caught) => {
                    this.message.error(error.error.message);
                    console.log(error.headers.get('authorization'), 'event')
                    return Observable.create(error);
                })) as any;
    }
}