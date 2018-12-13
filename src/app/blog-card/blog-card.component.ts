import { Component, OnInit, Input } from '@angular/core';
import { MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css']
})
export class BlogCardComponent implements OnInit {

  @Input() blog: Blob;

  constructor(private markdownService: MarkdownService) { }

  ngOnInit() {
  }

}
