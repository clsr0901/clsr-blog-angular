import { Component, OnInit } from '@angular/core';
import { Blog } from '../entity/Blog';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  array:Array<number> = [1,2,3,4, 5, 6, 7, 8, 9, 1,2,3,4, 5, 6, 7, 8, 9, 1,2,3,4, 5, 6, 7, 8, 9];
  constructor() { }

  ngOnInit() {
  
  }

}
