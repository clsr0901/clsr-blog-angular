import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from "../http-request.service";

import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {User} from "../entity/User";
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
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
    let password = this.validateForm.controls.password.value;
    let username = this.validateForm.controls.userName.value;
    if (password != null && password != "" && username != null && username != "") {
      this.user.password = password;
      this.user.username = username;
      this.httpRequestService.httpPost("/login/in",this.user).subscribe(res => {
        this.httpRequestService.setUser(res.data);
        this.httpRequestService.setToken(res.token);
        this.router.navigateByUrl("/home");
      }, err =>{

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
