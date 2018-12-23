import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { HttpRequestService } from '../http-request.service';
import { User } from '../entity/User';
import { Message } from '../entity/Message';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {
  private _userId: number;
  @Output('user-info') messageEmitter = new EventEmitter<any>();
  /**
     * 返回父组件变化后的值
     */
    @Input()
    get userId() {
        return this._userId;
    }

    /**
     * 组件值产生变化后父组件改变
     * @param value
     */
    set userId(value) {
        this._userId = value;
        this.getUserInfo();
    }
  user: User;
  message: Message;
  constructor(private httpRequestService: HttpRequestService, private toast: NzMessageService,) { }

  ngOnInit() {
    this.message = new Message();
    this.user = new User();
    this.getUserInfo();
  }

  getUserInfo(){
    this.httpRequestService.httpGet("/user/get/" + this._userId).subscribe(res => {
        this.user = res.data;
    }, err=>{

    });
  }

  leaveMessage(){
    if(this.message.message){
      this.message.sourceUserId = this.httpRequestService.getUser().id;
      this.message.destUserId = this._userId;
      this.httpRequestService.httpPut("/message/put/", this.message).subscribe(res => {
        this.message.message = "";
        this.toast.success("留言成功");
        this.messageEmitter.emit(this.message);
    }, err=>{

    });
    }else{
      this.toast.error("请先输入留言内容");
    }
  }

}
