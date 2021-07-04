import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private oAuthService: OAuthService, private http: HttpClient) {

  }

  logout () {
    this.oAuthService.logOut();
  }

  hello() {
    const header: HttpHeaders  = new HttpHeaders({
      Authorization: `Bearer ${this.oAuthService.getAccessToken()}`,
    })

    this.http.get('http://localhost:8080/hello/SSOTESTER4', { headers: header }).subscribe(
      (response) => {
        console.log(response)
      }
    )
  }
}
