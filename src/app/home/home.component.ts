import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { HttpRequestService } from '../http-request.service';
import { EventService } from '../service/event.service';
import { Blog } from '../entity/Blog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('header')
  header: HeaderComponent;
  userId: number;
  avatar: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private httpRequestService: HttpRequestService,
    private eventService: EventService) {
  }

  ngOnInit() {
    this.userId = this.httpRequestService.getUser().id;
    this.avatar = this.httpRequestService.getUser().avatar;
    console.log("home", this.avatar)
    console.log(this.activatedRoute.snapshot.paramMap, 'home')
    this.activatedRoute.queryParams.subscribe(params => {
      console.log("home", params);
    });
    this.header.greeting("parent");

    // 接收发射过来的数据
    this.eventService.eventEmit.subscribe((obj: any) => {
      if(obj == null){
        this.userId = this.httpRequestService.getUser().id;
      }else{
        this.userId = obj.user.id;
      }
        
    });
  }

  headerHeaderClick(event) {
    console.log(event)
    if (event == 0) {
      this.router.navigateByUrl("/edit/0");
    }
  }



}
