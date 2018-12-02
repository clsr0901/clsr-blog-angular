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
  private blog: Blog = new Blog();

  constructor(private markdownService: MarkdownService, private httpService: HttpRequestService, 
    private message: NzMessageService,private router: Router) { }

  ngOnInit() {
    
  }

  save(): void {
    if (!this.blog.content || this.blog.content.length < 1) {
      this.message.error("请先编辑博客内容");
      return;
    }
    this.blog.userId = this.httpService.getUser().id;
    this.httpService.httpPost("/blog/save", this.blog).subscribe(res => {
      console.log("blog", res)
      this.router.navigateByUrl("/home");
    }, err =>{
        
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
