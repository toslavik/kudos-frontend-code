import { Component, OnInit } from '@angular/core';
import {Kudo, User} from '../_models';
import {ActivatedRoute, Router, NavigationExtras} from '@angular/router';
import {RestService} from '../_services/rest.service';
import { AuthenticationServiceSimple } from '../_services';

@Component({
  selector: 'app-kudos-dashboard',
  templateUrl: './kudos-dashboard.component.html',
  styleUrls: ['./kudos-dashboard.component.css']
})
export class KudosDashboardComponent implements OnInit {

  public kudos: Kudo[];
  public kudo: Kudo;
  public loggedUser: any;

  constructor( private route: ActivatedRoute, private router: Router,
               private restService: RestService,private authenticationservice: AuthenticationServiceSimple) {
                this.loggedUser = authenticationservice.currentUserValue;
               }

  ngOnInit() {
    this.fetchKudos();
  }

  onEdit(kudo: Kudo){
   console.log('kudo to edit:' + JSON.stringify(kudo));
    // const navigationExtras: NavigationExtras = {queryParams: kudo};
    console.log('kudoid' + kudo.id);
    this.router.navigate(['/kudos-edit',{ queryParams: kudo.id}]);
  }

  spliceData(kudo: Kudo){
    const item = this.kudos.find(item => item.id === kudo.id);
    this.kudos.splice(this.kudos.indexOf(item));
    this.fetchKudos();
  }

  onDelete(kudo: Kudo){
    this.restService.deleteKudos(kudo).subscribe(
      (ok)=>{
      this.spliceData(kudo);
      }, (err) => {
        console.log(err);
      }
    );
  }

  fetchKudos(){
    this.restService.getKudos().subscribe((data: []) => {
      console.log(data);
      this.kudos = data;
    });
  }

  createNew(){
    this.router.navigate(['/kudos-add']);
  }
  checkPermission(kudo: Kudo): boolean{
      if(kudo.author!==this.loggedUser){
        return true;
      }else {
        return false;
      }

  }

}
