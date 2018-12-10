import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() avatar: string;
  
  @Output('header') write = new EventEmitter<any>();

  search: string;
  constructor() { }

  ngOnInit() {
  }

  greeting(name: string) {
    console.log('hello' + name);
  }

  //type 0写博客 1 资源管理
  clickWrite(type) {
    console.log("child clickWrite")
    this.write.emit(type);
  }

}
