import { Injectable } from '@angular/core';
import {WebsocketsService} from './websockets.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor( public wsService: WebsocketsService) { }

  sendMessage( message: string ) {
    const payload = {
      name: 'frank',
      message
    };

    this.wsService.emit('message', payload);
  }

  listenNewMessages() {
    return this.wsService.listen('new-message');
  }
}
