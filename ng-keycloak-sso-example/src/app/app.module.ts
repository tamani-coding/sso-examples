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
      requireHttps: false,
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
      if (event.type == 'token_error') {
        console.log('TOKEN_ERROR')
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
