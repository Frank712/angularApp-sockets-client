import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from '../models/user';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebsocketsService {

  public socketStatus = false;
  public user: User = null;

  constructor( private socket: Socket,
               private  router: Router) {
    this.loadFromStorage();
    this.checkStatus();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Connect to server!');
      this.socketStatus = true;
      this.loadFromStorage();
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnect from server!');
      this.socketStatus = false;
    });
  }

  emit( event: string, payload?: any, callback?: Function ) {
    console.log('Emitting...', event);
    this.socket.emit(event, payload, callback);
  }

  listen( event: string ) {
    console.log('Listening...', event);
    return this.socket.fromEvent( event );
  }

  getUser() {
    return this.user;
  }

  loginWS( name: string) {

    return new Promise( (resolve, reject) => {
      this.emit('config-user', { name }, ( resp ) => {
        this.user = new User(name);
        this.saveOnStorage();
        resolve();
      });
    });

  }

  logoutWS() {
    this.user = null;
    localStorage.removeItem('user');
    const payload = {
      name: 'without-name'
    };
    this.emit('config-user', payload, () => {});
    this.router.navigateByUrl('');
  }

  saveOnStorage() {
    localStorage.setItem( 'user', JSON.stringify(this.user) );
  }

  loadFromStorage() {
    if ( localStorage.getItem( 'user') ) {
      this.user = JSON.parse( localStorage.getItem( 'user') );
      this.loginWS( this.user.name );
    }
  }
}
