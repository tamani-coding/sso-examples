import { Component } from '@angular/core';
import { OAuthService, UserInfo } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private oAuthService: OAuthService) {

  }

  logout () {
    this.oAuthService.logOut();
  }
}
