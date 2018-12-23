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
        this.userId = this.httpRequestService.getUser().id;
        setTimeout(() => {
          this.showMessage = true;
        });
      } else {
        this.userId = obj.user.id;
        setTimeout(() => {
          this.showMessage = false;
        });

      }

    });
  }

  handleHeaderListener(event) {
    console.log(event)
    if (event == 0) {
      this.router.navigateByUrl("/edit/0");
    }
  }

  handleUserInfoListener(event) {
    console.log("home message", this.message, this.header)
    this.message.getMessages();
  }

}
