import { Component, OnInit } from '@angular/core';
import { MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  markdown: string;
  editable: boolean = true;

  constructor(private markdownService: MarkdownService) { }

  ngOnInit() {
    console.log(this.markdownService.compile('I am using __markdown__.'));
  }

  edit(): void{
    if(!this.editable){
      this.editable = true;
    }
  }

  review(): void{
    if(this.editable){
      this.editable = false;
    }
  }

}
