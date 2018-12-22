import { Component, OnInit } from '@angular/core';
import { MarkdownService } from 'ngx-markdown';
import { HttpRequestService } from '../http-request.service';
import { Blog } from '../entity/Blog';
import { ThrowStmt } from '@angular/compiler';
import { User } from '../entity/User';
import { NzMessageService } from 'ng-zorro-antd';
import { catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  markdown: string;
  editable: boolean = true;
  isVisibleMiddle: boolean = false;
  blog: Blog = new Blog();
  user: User;
  id: number;

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

  save(): void {
    if (!this.blog.content || this.blog.content.length < 1) {
      this.message.error("请先编辑博客内容");
      return;
    }
    this.isVisibleMiddle = true;

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
    if (!this.editable) {
      this.editable = true;
    }
  }

  review(): void {
    if (this.editable) {
      this.editable = false;
    }
  }

}
