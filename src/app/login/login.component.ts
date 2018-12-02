import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from "../http-request.service";

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {User} from "../entity/User";
import { from } from 'rxjs';
import { subscribeOn, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  private user: User = new User();

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm.controls.password.value, this.validateForm.controls.userName.value);
    let password = this.validateForm.controls.password.value;
    let username = this.validateForm.controls.userName.value;
    if (password != null && password != "" && username != null && username != "") {
      this.user.password = password;
      this.user.username = username;
      this.httpRequestService.httpPost("/login/in",this.user).subscribe(res => {
        this.httpRequestService.setToken(res.token);
        this.router.navigateByUrl("/edit");
      });
    }

  }


  constructor(private fb: FormBuilder, private httpRequestService: HttpRequestService,
     private router: Router) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
}
