import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  list: any[] = [];

  constructor(public oidcSecurityService: OidcSecurityService,
    public http: HttpClient) {

  }

  ngOnInit(): void {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData, accessToken, idToken }) => {
      console.log(isAuthenticated);
    });
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  callApi() {
    let token;
     this.oidcSecurityService.getAccessToken().subscribe(data => {
      token = data;
    });

    this.http.get("https://localhost:5445/api/RestoJus", {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
      responseType: 'json'
    })
      .subscribe((data: any) => {
        this.list= data;
      });
  }
}
