import { Component, OnInit } from '@angular/core';
import {Kudo, User} from '../_models';
import {ActivatedRoute, Router} from '@angular/router';
import {RestService} from '../_services/rest.service';

@Component({
  selector: 'app-kudos-dashboard',
  templateUrl: './kudos-dashboard.component.html',
  styleUrls: ['./kudos-dashboard.component.css']
})
export class KudosDashboardComponent implements OnInit {

  public kudos: Kudo[];
  public kudo: Kudo;

  constructor( private route: ActivatedRoute, private router: Router,
               private restService: RestService) { }

  ngOnInit() {
    this.restService.getKudos().subscribe((data: []) => {
      console.log(data);
      this.kudos = data;
    });
  }

  onEdit(kudo: Kudo){
    this.router.navigate(['/kudos-edit']);
    // this.restService.updateKudos(kudo.id).subscribe(res => {
    //     this.restService.getKudos();
    //   }, (err) => {
    //     console.log(err);
    //   }
    // );
  }

  onDelete(kudo: Kudo){
    this.restService.deleteKudos(kudo.id).subscribe(res => {
        this.restService.getKudos();
      }, (err) => {
        console.log(err);
      }
    );
  }

  createNew(){
    this.router.navigate(['/kudos-add']);
  }
}
