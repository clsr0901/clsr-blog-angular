import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Blog } from '../entity/Blog';
import { HttpRequestService } from "../http-request.service";
import { Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {



  blogs: Blog[];
  constructor(private httpRequestService: HttpRequestService, private router: Router) { }

  ngOnInit() {
    this.httpRequestService.httpGet("/blog/get").subscribe(res => {
     this.blogs = res.data;
    }, err =>{
    });
  }

  onSelect(blog: Blob): void{
    this.router.navigateByUrl("/home/detail");
  }

}
