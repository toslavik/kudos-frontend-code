import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../_services/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Category, Kudo, User} from '../_models';
import {AuthenticationServiceSimple, UserService} from '../_services';

@Component({
  selector: 'app-kudos-add',
  templateUrl: './kudos-add.component.html',
  styleUrls: ['./kudos-add.component.css']
})
export class KudosAddComponent implements OnInit {
  public kudo: Kudo = <Kudo>{};
  public users: User[];
  public categories: Category[];
  public loggedUser: any;
  private selectedUser: User;
  private selectedCategory: Category;
  public description: string;

  // @Input() kudosData = { id: '', giver: '', reciever: '' };

  constructor(public rest: RestService, public userService: UserService, private route: ActivatedRoute,
              private router: Router, private authenticationservice: AuthenticationServiceSimple) {
    this.loggedUser = authenticationservice.currentUserValue;
  }

  ngOnInit() {
    this.userService.getAll().subscribe((data: []) => {
      console.log(data);
      this.users = data;
    });
  }

  saveKudo() {
    console.log(this.description);
    this.completeKudo();
    console.log(this.kudo);
    // this.rest.addKudos(this.kudo).subscribe((result) => {
    //   this.router.navigate(['/kudos-dashboard/']);
    // }, (err) => {
    //   console.log(err);
    // });
  }

  private completeKudo(){
    this.kudo.author = this.loggedUser;
    this.kudo.receiver = this.selectedUser.fullname;
    this.kudo.category = this.loggedUser;
    this.kudo.description = this.description;
  }
}
