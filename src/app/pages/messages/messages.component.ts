import { Component, OnInit } from '@angular/core';
import {WebsocketsService} from '../../services/websockets.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor( public wsService: WebsocketsService ) { }

  ngOnInit() {
  }

  logout() {
    this.wsService.logoutWS();
  }

}
