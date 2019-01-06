import { Component, OnInit } from '@angular/core';
import {WebsocketsService} from '../../services/websockets.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  name = '';

  constructor( public wsService: WebsocketsService ) { }

  ngOnInit() {
  }

  login() {
    this.wsService.loginWS( this.name );
  }

}
