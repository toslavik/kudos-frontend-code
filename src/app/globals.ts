import { Injectable, OnInit, isDevMode, enableProdMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment.prod';

@Injectable()
export class Globals implements OnInit{

  public urlBackend: string;

  ngOnInit() {
  }
  constructor(private http: HttpClient) {
    this.getUrl();
  }

  getUrl(){
    if(isDevMode()) {
        this.urlBackend = environment.apiUrlBackend;
    } else {
      this.http.get('http://localhost:4200/assets/default.aspx',{responseType: 'text'}).subscribe(data => {
        console.log(data);
        this.urlBackend = data;
       });
    }

  }
}
