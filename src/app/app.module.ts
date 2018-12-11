import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BlogInterceptor } from './interceptor/blog.interceptor';
import { MarkdownModule } from 'ngx-markdown';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { LoginComponent } from './login/login.component';
import { HttpRequestService } from './http-request.service';
import { from } from 'rxjs';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component';
import { HeaderComponent } from './header/header.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import {BlogListComponent} from './blog-list/blog-list.component';
import {BlogCardComponent} from './blog-card/blog-card.component';
registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    EditComponent,
    HeaderComponent,
    UserinfoComponent,
    BlogListComponent,
    BlogCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    AppRoutingModule,
    MarkdownModule.forRoot()
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }, HttpRequestService,
  { provide: HTTP_INTERCEPTORS, useClass: BlogInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
