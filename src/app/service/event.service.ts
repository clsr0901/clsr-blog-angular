import { Injectable, EventEmitter, OnInit } from '@angular/core';

@Injectable()
export class EventService implements OnInit{
  public eventEmit: any;
  constructor() { 
    this.eventEmit = new EventEmitter();
  }

  ngOnInit(){

  }
}
