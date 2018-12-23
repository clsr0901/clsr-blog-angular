import { Component, OnInit } from '@angular/core';
import { User } from '../entity/User';
import { HttpRequestService } from '../http-request.service';
import { Message } from '../entity/Message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  user: User;
  messages: Message[];
  constructor(private httpRequestService: HttpRequestService) { }

  ngOnInit() {
    this.user = this.httpRequestService.getUser();
    this.getMessages();

  }

  public getMessages() {
    this.httpRequestService.httpGet("/message/get/" + this.user.id).subscribe(res => {
      this.messages = res.data;
    }, error => {

    })
  }

  deleteMessage(message: Message) {
    this.httpRequestService.httpDelete("/message/delete/" + message.id).subscribe(res => {
      let index = this.messages.indexOf(message);
      if (index != -1)
        this.messages.splice(index, 1);
    }, error => {

    })
  }

}
