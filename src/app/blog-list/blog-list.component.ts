import { Component, OnInit } from '@angular/core';
import { Blog } from '../entity/Blog';
import { HttpRequestService } from "../http-request.service";
import { from } from 'rxjs';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  blogs: Blog[];
  constructor(private httpRequestService: HttpRequestService) { }

  ngOnInit() {
    this.httpRequestService.httpGet("/blog/get").subscribe(res => {
     this.blogs = res.data;
    }, err =>{
    });
  }

}
