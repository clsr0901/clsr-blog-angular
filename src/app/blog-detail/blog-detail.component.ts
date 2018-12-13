import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from "../http-request.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  blog: Blob;
  constructor(private httpRequestService: HttpRequestService, private router: Router) { }

  ngOnInit() {
    this.httpRequestService.httpGet("/blog/get/6").subscribe(res => {
      this.blog = res.data;
     }, err =>{
     });
  }

  back() {
    history.back();
  }

}
