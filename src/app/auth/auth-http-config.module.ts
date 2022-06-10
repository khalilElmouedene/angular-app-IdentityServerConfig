import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: [
        {
          authority: 'http://localhost:5000',
          redirectUrl: window.location.origin,
          postLogoutRedirectUri: window.location.origin,
          clientId: 'angular',
          scope: 'openid JusAPI',
          responseType: 'code',
          logLevel: LogLevel.Debug,
        }

      ],
    }),
  ],
  exports: [AuthModule],
})
export class AuthConfigModule { }
