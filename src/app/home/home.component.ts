import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HeaderComponent} from '../header/header.component';
import { Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('header')
  header: HeaderComponent;
  avatar: string = "//zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png";

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { 
  }

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.paramMap, 'home')
    this.activatedRoute.queryParams.subscribe(params => {
      console.log("home", params);
      });
      this.header.greeting("parent");
  }

  headerHeaderClick(event){
    console.log(event)
    if(event == 0){
      this.router.navigateByUrl("/edit");
    }
  }

}
