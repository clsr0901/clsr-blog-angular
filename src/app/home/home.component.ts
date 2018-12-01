import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { 
    
  }

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.paramMap, 'home')
    this.activatedRoute.queryParams.subscribe(params => {
      console.log("home", params);
      });
  }

}
