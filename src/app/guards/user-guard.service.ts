import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {WebsocketsService} from '../services/websockets.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuardService implements CanActivate {

  constructor( public wsService: WebsocketsService,
               private router: Router) { }

  canActivate() {
    console.log('Verify User!');
    if ( !this.wsService.getUser() ) {
      this.router.navigateByUrl('/');
      return false;
    } else {
      return true;
    }
  }
}
