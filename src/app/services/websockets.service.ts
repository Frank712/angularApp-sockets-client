import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketsService {

  public socketStatus = false;

  constructor( private socket: Socket) {
    this.checkStatus();
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

  emit( event: string, payload?: any, callback?: Function ){
    console.log('Emitting...', event);
    this.socket.emit(event, payload, callback);
  }

  listen( event: string ) {
    console.log('Listening...', event);
    return this.socket.fromEvent( event );
  }
}
