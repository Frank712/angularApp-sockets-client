import { Component, OnInit } from '@angular/core';
import {WebsocketsService} from '../../services/websockets.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  name = '';

  constructor( public wsService: WebsocketsService,
               private router: Router ) { }

  ngOnInit() {
  }

  login() {
    this.wsService.loginWS( this.name )
      .then( () => {
        this.router.navigateByUrl('/messages');
    });
  }

}
