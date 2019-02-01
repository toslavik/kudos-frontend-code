import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../_services/rest.service';
import { Kudo } from './../_models/kudo';
import { User, Category } from '../_models';
import { UserService } from '../_services';

@Component({
  selector: 'app-kudos-edit',
  templateUrl: './kudos-edit.component.html',
  styleUrls: ['./kudos-edit.component.css']
})
export class KudosEditComponent implements OnInit {

  public users: User[];
  public selectedUserId: string;
  public description: string;
  public selectedCategoryId: string;
  public categories: Category[];
  public selectedCategory: Category;

  kudo: Kudo;
  constructor(private route: ActivatedRoute, private router: Router,
              private restService: RestService, public userService: UserService) {
      }

  ngOnInit() {
    const id = this.route.snapshot.params.queryParams;
       this.restService.getKudosById(id).subscribe((data: Kudo[]) => {
        this.kudo = data[0];
        this.selectedCategoryId = this.kudo.category.id;

        this.getFakeCategories();
        this.selectedUserId = this.kudo.receiver;
      });
       console.log('params: ' + JSON.stringify(this.route.snapshot.params));
       this.route.paramMap.subscribe(params => {
         console.log('paramkudostringify is: ' + JSON.stringify(id));
        });
    this.userService.getAll().subscribe((data: []) => {
      console.log(data);
      this.users = data;
    });

  }
  getFakeCategories(): any {
    // This needs to be DATA service!
    // TODO: create a data service
    this.categories = [{'id':'1','description': 'Technical'},{'id':'2','description': 'HR'}];
  }

  updateKudo(){
    this.completeKudo();
    console.log(this.kudo);
    this.restService.updateKudos(this.kudo).subscribe(res =>
      this.router.navigate(['/kudos-dashboard'])
      );
  }
  getSelectedCat(id: string): Category{
    this.selectedCategory = this.categories.filter(function(cat) {
      return cat.id === id;
    })[0];
    console.log(this.selectedCategory);
    return this.selectedCategory;
  }
  private completeKudo(){
    this.kudo.receiver = this.selectedUserId;
    this.kudo.category = this.getSelectedCat(this.selectedCategoryId);
  }
}
