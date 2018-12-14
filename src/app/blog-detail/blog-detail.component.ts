import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from "../http-request.service";
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import {Blog} from '../entity/Blog';
import { from } from 'rxjs';;
import { filter,map,mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  blog: Blob;
  constructor(private httpRequestService: HttpRequestService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.blog = new Blob();
    this.blog.updatetime = "";
    this.getBlog();
  }

  getBlog(){
    this.httpRequestService.httpGet("/blog/get/" + this.activatedRoute.snapshot.params.id).subscribe(res => {
      this.blog = res.data;
     }, err =>{
     });
  }

  back() {
    history.back();
  }

}
