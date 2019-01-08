import { Injectable } from '@angular/core';
import {WebsocketsService} from './websockets.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor( public wsService: WebsocketsService) { }

  sendMessage( message: string ) {
    const payload = {
      name: this.wsService.user.name,
      message
    };

    this.wsService.emit('message', payload);
  }

  listenNewMessages() {
    return this.wsService.listen('new-message');
  }

  getPrivateMessages() {
    return this.wsService.listen( 'message-private' );
  }

  getActiveUsers() {
    return this.wsService.listen( 'active-users' );
  }

  emitActiveUsers() {
    return this.wsService.emit( 'get-users' );
  }
}
