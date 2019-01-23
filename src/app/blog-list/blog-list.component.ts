import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpRequestService } from "../http-request.service";
import { Router, ActivatedRoute } from '@angular/router';
import { Blog } from '../entity/Blog';
import { EventService } from '../service/event.service';
import { PageQuery } from '../entity/PageQuery';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  blogs: Blog[];
  pageQuery: PageQuery;
  constructor(private httpRequestService: HttpRequestService, private router: Router, private activatedRoute: ActivatedRoute,
    private evnetService: EventService) { }

  ngOnInit() {
    this.evnetService.eventEmit.emit(null);
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.search) {
        this.getDataByKeycode(params.search);
      } else {
        this.getData();
      }
    });
  }

  getDataByKeycode(keycode: string) {
    this.pageQuery = new PageQuery();
    this.pageQuery.keyword = keycode;
    this.pageQuery.pageNum = 1;
    this.pageQuery.pageSize = -1;
    this.httpRequestService.httpPost("/blog/post/keyword", this.pageQuery).subscribe(res => {
      this.blogs = res.data;
    }, error => {

    })
  }

  getData() {
    this.httpRequestService.httpGet("/blog/get").subscribe(res => {
      this.blogs = res.data;
    }, err => {
    });
  }
  onSelect(blog: Blog): void {
    this.evnetService.eventEmit.emit(blog);
    this.router.navigateByUrl("/home/detail/" + blog.id);
  }

}
