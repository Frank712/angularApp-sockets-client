import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class WebsocketsService {

  public socketStatus = false;
  public user: User = null;

  constructor( private socket: Socket) {
    this.checkStatus();
    this.loadFromStorage();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Connect to server!');
      this.socketStatus = true;
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

    return new Promise( (resolve, reject) =>{
      this.emit('config-user', { name }, ( resp ) => {
        this.user = new User(name);
        this.saveOnStorage();
        resolve();
      });
    });

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
