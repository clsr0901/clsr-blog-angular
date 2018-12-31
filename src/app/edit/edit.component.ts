import { Component, OnInit } from '@angular/core';
import { MarkdownService } from 'ngx-markdown';
import { HttpRequestService } from '../http-request.service';
import { Blog } from '../entity/Blog';
import { ThrowStmt } from '@angular/compiler';
import { User } from '../entity/User';
import { NzMessageService } from 'ng-zorro-antd';
import { catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Source } from '../entity/Source';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  markdown: string;
  editType: number = 0;//0 预览编辑模式 1 预览模式 2 编辑模式
  select: number = 0;
  isVisibleMiddle: boolean = false;
  isVisibleFileList: boolean = false;
  blog: Blog = new Blog();
  user: User;
  id: number;
  sources: Source[] =[];

  constructor(private markdownService: MarkdownService, private httpRequestService: HttpRequestService,
    private message: NzMessageService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.user = this.httpRequestService.getUser();
    this.id = this.activatedRoute.snapshot.params.id;
    if (this.id != 0) {
      this.httpRequestService.httpGet("/blog/get/" + this.activatedRoute.snapshot.params.id).subscribe(res => {
        this.blog = res.data;
      }, err => {
      });
    }
  }

  handleOkMiddle(): void {
    if (!this.blog.title || this.blog.title.length < 1) {
      this.message.error("请输入博客标题");
      return;
    }
    this.blog.userId = this.user.id;
    delete this.blog.user;
    if (this.id == 0) {
      this.put();
    } else {
      this.post();
    }
  }
  handleCancelMiddle(): void {
    this.isVisibleMiddle = false;
  }
  handleCancelFileList(): void {
    this.isVisibleFileList = false;
  }

  put() {
    this.httpRequestService.httpPut("/blog/put", this.blog).subscribe(res => {
      this.isVisibleMiddle = false;
      this.router.navigateByUrl("/home");

    }, err => {

    });
  }

  post() {
    this.httpRequestService.httpPost("/blog/post", this.blog).subscribe(res => {
      this.isVisibleMiddle = false;
      this.router.navigateByUrl("/home");

    }, err => {

    });
  }

  edit(): void {
    this.editType = 2;
    this.select = 3;
  }
  columns(): void {
    this.editType = 0;
    this.select = 2;
  }
  review(): void {
    this.editType = 1;
    this.select = 1;
  }

  save(): void {
    this.select = 5;
    if (!this.blog.content || this.blog.content.length < 1) {
      this.message.error("请先编辑博客内容");
      return;
    }
    this.isVisibleMiddle = true;

  }

  fileList(){
    this.select = 4;
    this.isVisibleFileList = true;
    this.httpRequestService.httpGet("/source/get/" + this.httpRequestService.getUser().id).subscribe(res => {
        this.sources = res.data;
    }, err =>{})
  }

}
