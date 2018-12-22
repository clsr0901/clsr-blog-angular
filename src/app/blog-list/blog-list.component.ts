import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpRequestService } from "../http-request.service";
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { Blog } from '../entity/Blog';
import { EventService } from '../service/event.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  blogs: Blog[];
  constructor(private httpRequestService: HttpRequestService, private router: Router, private evnetService: EventService) { }

  ngOnInit() {
    this.evnetService.eventEmit.emit(null);
    this.httpRequestService.httpGet("/blog/get").subscribe(res => {
     this.blogs = res.data;
    }, err =>{
    });
  }

  onSelect(blog: Blog): void{
    this.evnetService.eventEmit.emit(blog);
    this.router.navigateByUrl("/home/detail/" + blog.id);
  }

}
