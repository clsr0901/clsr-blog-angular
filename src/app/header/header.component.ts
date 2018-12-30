import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequestService } from '../http-request.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() avatar: string;

  // @Output('header') write = new EventEmitter<any>();

  search: string;
  constructor(private router: Router, private httpRequestService: HttpRequestService) { }

  ngOnInit() {
  }

  greeting(name: string) {
    console.log('hello' + name);
  }

  //type 0写博客 1 资源管理
  clickWrite(type) {
    // this.write.emit(type);
    if(type == 0){
      this.router.navigateByUrl("/edit/0");
    }else if(type == 1){
      this.router.navigateByUrl("/source");
    }
  }

  toHome() {
    console.log("home")
    this.router.navigateByUrl("/home");
  }

  logout() {
    this.httpRequestService.setToken("");
    this.router.navigateByUrl('/login');
  }

  handleSearch() {
    this.router.navigate(['/home/list'], { queryParams: { 'search': this.search } });
  }

  keyUpSearch(event) {
    if (event.key == "Enter") {
      this.handleSearch();
    }
  }

}
