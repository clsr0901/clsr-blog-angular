import { Component, OnInit, Input } from '@angular/core';
import { HttpRequestService } from '../http-request.service';
import { Comment } from '../entity/Comment';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  private _blogId: number;

  /**
     * 返回父组件变化后的值
     */
  @Input()
  get blogId() {
    return this._blogId;
  }

  /**
   * 组件值产生变化后父组件改变
   * @param value
   */
  set blogId(value) {
    this._blogId = value;
  }

  comment: Comment;
  comments: Comment[];
  constructor(private httpRequestService: HttpRequestService, private nzMessageService: NzMessageService) { }

  ngOnInit() {
    this.comment = new Comment();
    this.getComments();
  }

  getComments(){
    this.httpRequestService.httpGet("/comment/get/" + this._blogId).subscribe(res => {
      console.log("comment", this.comments)
      this.comments = res.data;
    }, error => {

    })
  }

  submitComment() {
    if(this.blogId != 0){
      this.comment.blogId = this.blogId;
      this.comment.action = 0;
      this.comment.sourceUserId = this.httpRequestService.getUser().id;
      this.httpRequestService.httpPut("/comment/put", this.comment).subscribe(res => {
        this.getComments();
        this.comment.content = "";
      }, errror => {

      })
    }else{
      this.nzMessageService.warning("请刷新页面后重试");
    }
  }

  submitReply(comment: Comment){
    let reply = new Comment();
    reply.blogId = this.blogId;
    reply.action = 1;
    reply.destUserId = comment.sourceUserId;
    reply.sourceUserId = this.httpRequestService.getUser().id;
    reply.content = comment.replyContent;
    this.httpRequestService.httpPut("/comment/put", reply).subscribe(res => {
      this.getComments();
    }, errror => {

    })
  }

  deleteComment(comment: Comment){
    this.httpRequestService.httpDelete("/comment/delete/" + comment.id).subscribe(res => {
      let index = this.comments.indexOf(comment);
      if (index != -1)
        this.comments.splice(index, 1);
    }, error => {

    })
  }
}
