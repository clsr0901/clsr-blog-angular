import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from "../http-request.service";
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { from } from 'rxjs';;
import { filter,map,mergeMap } from 'rxjs/operators';
import { Blog } from '../entity/Blog';
import { Location } from '@angular/common';
import { NzModalService } from 'ng-zorro-antd';
import { User } from '../entity/User';
import { EventService } from '../service/event.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  blog: Blog;
  isVisible = false;
  isOkLoading = false;
  user: User;

  constructor(private httpRequestService: HttpRequestService, private router: Router,
    private activatedRoute: ActivatedRoute, private location: Location, private modalService: NzModalService,
    private evnetService: EventService) {}

  ngOnInit() {
    this.blog = new Blog();
    this.blog.updatetime = "";
    this.user = this.httpRequestService.getUser();
    this.getBlog();
  }

  getBlog(){
    this.httpRequestService.httpGet("/blog/get/" + this.activatedRoute.snapshot.params.id).subscribe(res => {
      this.blog = res.data;
     }, err =>{
     });
  }

  back() {
    // history.back();
    this.location.back();
  }

  edit(id: number) {
    this.router.navigateByUrl("/web/edit/" + id);
  }

  delete() {
    this.modalService.error({
      nzTitle: '删除',
      nzContent: '确定删除 【 ' + this.blog.title + ' 】 ？',
      nzCancelText: '取消',
      nzOnOk: () => {this.httpRequestService.httpDelete("/blog/delete/" + this.blog.id).subscribe(res=>{
        this.back();
      }, err=>{})},
    });
  }

  


}
