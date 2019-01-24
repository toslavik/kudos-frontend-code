import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { User } from '../_models';
import {environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': '6e0eeb81c3f04afd96fc4f5f7386caf3'
  })
};


@Injectable({ providedIn: 'root' })
export class UserService {
    private apiURLKudos = environment.apiUrlBackend + '/users';
    private apiCors = environment.apiUrlBackendCors;
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(this.apiURLKudos, httpOptions);
    }

    getById(id: number) {
        return this.http.get<User>(`${config.apiUrl}/users/${id}`);
    }
}

