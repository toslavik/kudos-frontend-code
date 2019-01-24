import {Component, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../_services';
import {User} from '../_models';
import {AuthenticationServiceSimple} from '../_services/authentication-simple.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  submitLoading: boolean = false;

  public users: User[];
  constructor(public userService: UserService, private route: ActivatedRoute, private router: Router,
              private authenticationService: AuthenticationServiceSimple) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/kudos-dashboard']);
    }

     }
  private selectedUser: User;

  ngOnInit() {
    this.userService.getAll().subscribe((data: []) => {
      console.log(data);
      this.users = data;
    });
  }

  loginUser() {
    // this.currentUser = this.authenticationService.currentUserValue;
    this.authenticationService.setSubject(this.selectedUser);
    localStorage.setItem('selectedUser', this.selectedUser.toString());
    this.router.navigate(['/kudos-dashboard/']);
  }

}
