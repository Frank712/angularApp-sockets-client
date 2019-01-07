import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MessagesComponent} from './pages/messages/messages.component';
import {LoginComponent} from './pages/login/login.component';
import {UserGuardService} from './guards/user-guard.service';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'messages', component: MessagesComponent, canActivate: [ UserGuardService ] },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot( appRoutes )
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
