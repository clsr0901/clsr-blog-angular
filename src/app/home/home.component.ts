import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { HttpRequestService } from '../http-request.service';
import { EventService } from '../service/event.service';
import { Blog } from '../entity/Blog';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('header')
  header: HeaderComponent;
  @ViewChild('message')
  message: MessageComponent;
  userId: number;
  blogId: number;
  avatar: string;
  showMessage: boolean = true;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private httpRequestService: HttpRequestService,
    private eventService: EventService) {
  }

  ngOnInit() {
    this.userId = this.httpRequestService.getUser().id;
    this.avatar = this.httpRequestService.getUser().avatar;
    console.log(this.activatedRoute.snapshot.paramMap, 'home')
    this.activatedRoute.queryParams.subscribe(params => {
      console.log("home", params);
    });
    this.header.greeting("parent");

    // 接收发射过来的数据
    this.eventService.eventEmit.subscribe((obj: any) => {
      if (obj == null) {
        setTimeout(() => {
          this.userId = this.httpRequestService.getUser().id;
          this.blogId = 0;
          this.showMessage = true;
        });
      } else {
        setTimeout(() => {
          this.blogId = obj.id;
          this.userId = obj.user.id;
          this.showMessage = false;
        });

      }

    });
  }

  handleHeaderListener(event: any) {
    console.log(event)
    if (event == 0) {
      this.router.navigateByUrl("/edit/0");
    }
  }

  handleUserInfoListener(event: any) {
    this.message.getMessages();
  }

}
