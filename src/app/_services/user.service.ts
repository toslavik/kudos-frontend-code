import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { User } from '../_models';
import {environment} from '../../environments/environment';
import { DataService } from './data.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': '6e0eeb81c3f04afd96fc4f5f7386caf3'
  })
};


@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient, private dataservice: DataService) {
     }

    getAll() {
        return this.http.get<User[]>(this.dataservice.urlBackend + '/v2/users', httpOptions);
    }

    getById(id: string) {
        return this.http.get<User>(`${config.apiUrl}/users/${id}`);
    }
}

