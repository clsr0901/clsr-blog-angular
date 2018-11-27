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
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  private user: User = new User("admin", "root");

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm.controls.password.value, this.validateForm.controls.userName.value);
    let password = this.validateForm.controls.password.value;
    let username = this.validateForm.controls.userName.value;
    if (password != null && password != "" && username != null && username != "") {
      console.log("login");
      this.httpRequestService.httpPost("http://localhost:8080/test",this.user, this, "flag")
    }

  }


  constructor(private fb: FormBuilder, private httpRequestService: HttpRequestService) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  getOk(val, flag): void {
    console.log(val, flag);
  }

  getError(val, flag): void {
    console.log(val, flag);
  }

  postOk(val, flag): void {
    console.log(val, flag);
  }

  postError(val, flag): void {
    console.log(val, flag);
  }
}
