import {EventEmitter, Injectable, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataService {

  public urlBackend: string;
    constructor(private http: HttpClient) {
    }

    getSettings(): Promise<any> {
      console.log(`getSettings:: before http.get call`);
      if(environment.production===true){
        const promise = this.http.get('/assets/default.aspx',{responseType: 'text'})
        .toPromise()
        .then(settings => {
          console.log(`Settings from API: `, settings);
          this.urlBackend = settings;
          return settings;
        });
        return promise;
      } else {
        this.urlBackend = environment.apiUrlBackend;
      }
    }

    async getAsyncData() {
      this.urlBackend = await this.http.get('/assets/default.aspx',{responseType: 'text'}).toPromise();
      console.log('No issues, I will wait until promise is resolved..' + this.urlBackend);
    }
}
