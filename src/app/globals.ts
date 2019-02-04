import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class Globals implements OnInit{

  public urlBackend: string;

  ngOnInit() {
  }
  constructor(private http: HttpClient) {
    this.http.get('http://localhost:4200/assets/default.aspx',{responseType: 'text'}).subscribe(data => {
                   console.log(data);
                   this.urlBackend = data;
                  });
  }
}
