import { Component, OnInit } from '@angular/core';
import { MarkdownService } from 'ngx-markdown';
import { HttpRequestService } from '../http-request.service';
import { Blog } from '../entity/Blog';
import { ThrowStmt } from '@angular/compiler';
import { User } from '../entity/User';
import { NzMessageService } from 'ng-zorro-antd';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  markdown: string;
  editable: boolean = true;
  isVisibleMiddle: boolean = false;
  private blog: Blog = new Blog();
  private user: User;

  constructor(private markdownService: MarkdownService, private httpService: HttpRequestService, 
    private message: NzMessageService,private router: Router) { }

  ngOnInit() {
    this.user = this.httpService.getUser();
  }

  save(): void {
    if (!this.blog.content || this.blog.content.length < 1) {
      this.message.error("请先编辑博客内容");
      return;
    }
    this.isVisibleMiddle = true;
   
  }
  handleOkMiddle(): void{
    if (!this.blog.title || this.blog.title.length < 1) {
      this.message.error("请输入博客标题");
      return;
    }
    this.blog.userId = this.user.id;
    this.httpService.httpPost("/blog/save", this.blog).subscribe(res => {
      console.log("blog", res)
      this.isVisibleMiddle = false;
      this.router.navigateByUrl("/home");
      
    }, err =>{
        
    });
  }
  handleCancelMiddle(): void{
    this.isVisibleMiddle = false;
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
