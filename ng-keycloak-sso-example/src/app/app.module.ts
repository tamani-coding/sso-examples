import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthConfig, OAuthEvent, OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { AppComponent } from './app.component';


function initializeApp(oAuthService: OAuthService): Promise<any> {
  return new Promise((resolve, reject) => {

    const authConfig: AuthConfig = {
      // keycloak auth provider
      issuer: 'http://localhost:8180/auth/realms/sso-test',
      // redirect user here after login
      redirectUri: window.location.origin,
      // clientid in keycloak
      clientId: 'ssotest',
      // for local testing only
      requireHttps: false,
      // code flow instead of implicity flow
      responseType: 'code',
    }

    oAuthService.configure(authConfig)
    oAuthService.setupAutomaticSilentRefresh()
    oAuthService.loadDiscoveryDocumentAndLogin().then((x) => {
      resolve(null)
    }).catch(() => {
      reject()
    })

    oAuthService.events.subscribe((event: OAuthEvent) => {
      if (event.type == 'token_error' || event.type == 'token_refresh_error') {
        oAuthService.initLoginFlow()
      }
    })
  });
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
        sendAccessToken: false
      }
    }),
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initializeApp,
    deps: [OAuthService]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
