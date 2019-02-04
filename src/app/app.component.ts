import {Component, forwardRef, Inject, OnInit} from '@angular/core';
import {AuthenticationServiceSimple} from './_services/authentication-simple.service';
import {LoginPageComponent} from './login-page/login-page.component';
import { HttpClient } from '@angular/common/http';
import { Globals } from './globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser: String;
  title = 'kudos-fe';


  ngOnInit() {
    this.authenticationService.userSubject.subscribe(currentUser => this.currentUser = currentUser);
  }
  constructor(private authenticationService: AuthenticationServiceSimple, private global: Globals) {
    global.getUrl();
  }

    logout() {
    this.authenticationService.logout();
    }

}
