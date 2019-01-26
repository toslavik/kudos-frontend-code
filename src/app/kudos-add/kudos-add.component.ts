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
  public selectedUser: User;
  public selectedCategory: Category;
  public description: string;
  protected selectedCategoryId: string;

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
    this.getFakeCategories();
  }

  saveKudo() {
    console.log(this.description);
    this.completeKudo();
    console.log(this.kudo);
    this.rest.addKudos(this.kudo).subscribe((result) => {
      this.router.navigate(['/kudos-dashboard/']);
    }, (err) => {
      console.log(err);
    });
  }

  getFakeCategories(){
    this.categories = [{'id':'1','description': 'Technical'},{'id':'2','description': 'HR'}];
  }
  getSelectedCat(id: string): Category{
    this.selectedCategory = this.categories.filter(function(cat) {
      return cat.id === id;
    })[0];
    console.log(this.selectedCategory);
    return this.selectedCategory;
  }
  private completeKudo(){
    this.kudo.author = this.loggedUser;
    this.kudo.receiver = this.selectedUser.toString();
    this.kudo.category = this.getSelectedCat(this.selectedCategoryId);
    this.kudo.description = this.description;
  }
}
