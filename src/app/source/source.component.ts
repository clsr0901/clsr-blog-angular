import { Component, OnInit } from '@angular/core';
import { NzMessageService, UploadXHRArgs, UploadFile } from 'ng-zorro-antd';
import { HttpClient, HttpRequest, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { forkJoin, from } from 'rxjs';
import { ParallelHasher } from 'ts-md5/dist/parallel_hasher';
import { HttpRequestService } from '../http-request.service';
import { Source } from '../entity/Source';

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.css']
})
export class SourceComponent implements OnInit {

  fileList: Source[] = [];
  previewImage = '';
  previewVisible = false;

  constructor(private msg: NzMessageService, private http: HttpClient, private httpRequestService: HttpRequestService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.httpRequestService.httpGet("/source/get/" + this.httpRequestService.getUser().id).subscribe(res => {
      this.fileList = res.data;
    }, err => {
      this.msg.error(err.msg);
    })
  }

  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }

  customReq1 = (item: UploadXHRArgs) => {
    // 构建一个 FormData 对象，用于存储文件或其他参数
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    formData.append('file', item.file as any);
    formData.append('md5', '1000');
    const req = new HttpRequest('POST', item.action, formData, {
      reportProgress: true,
      withCredentials: true
    });
    // 始终返回一个 `Subscription` 对象，nz-upload 会在适当时机自动取消订阅
    return this.http.request(req).subscribe((event: HttpEvent<{}>) => {
      if (event.type === HttpEventType.UploadProgress) {
        if (event.total > 0) {
          // tslint:disable-next-line:no-any
          (event as any).percent = event.loaded / event.total * 100;
        }
        // 处理上传进度条，必须指定 `percent` 属性来表示进度
        item.onProgress(event, item.file);
      } else if (event instanceof HttpResponse) {
        // 处理成功
        item.onSuccess(event.body, item.file, event);
      }
    }, (err) => {
      // 处理失败
      item.onError(err, item.file);
    });
  }

  // 一个简单的分片上传
  customReq = (item: UploadXHRArgs) => {
    let hasher = new ParallelHasher('../../assets/images/md5_worker.js');
    let that = this;
    hasher.hash(item.file).then(function (result) {
      const chunkSize = 1024 * 1024 * 2;
      const size = item.file.size;
      const maxChunk = Math.ceil(size / chunkSize);
      that.uploadfile(maxChunk, chunkSize, 0, result, item);
    });

  }

  uploadfile(maxChunk: number, chunkSize: number, index: number, md5: string, item: UploadXHRArgs) {
    const start = index * chunkSize;
    let end = start + chunkSize;
    if (start > item.file.size) {
      const formData = new FormData();
      formData.append('fileName', item.file.name);
      formData.append('md5', md5);
      formData.append('ext', item.file.type);
      this.httpRequestService.httpFormDataPost("/upload/merge", formData).subscribe(res => {
        // 处理成功
        this.msg.success("上传成功");
        // 处理成功
        // item.onSuccess({}, item.file, event);
        this.getData();
      }, err => {
        // 处理失败
        this.msg.error(err.msg);
        item.onError(err, item.file);
      })
    } else {
      if (item.file.size - end < 0) {
        end = item.file.size;
      }
      const formData = new FormData();
      formData.append('file', item.file.slice(start, end));
      formData.append('md5', md5);
      formData.append('ext', item.file.type);
      formData.append('chunk', index.toString());
      formData.append('chunks', maxChunk.toString());
      this.httpRequestService.httpFormDataPost("/upload/chunk", formData).subscribe(res => {
        this.uploadfile(maxChunk, chunkSize, index + 1, md5, item);
      }, (err) => {
        // 处理失败
        this.msg.error(err.msg);
        item.onError(err, item.file);
      });
    }

  }

  remove = (file: Source) => {
    // this.httpRequestService.httpDelete("/source/delete/" + file.uid).subscribe(res => {
    //   this.getData();
    // }, err => {
    //   this.msg.error(err.msg);
    // })
    this.fileList.pop();
  }
}

