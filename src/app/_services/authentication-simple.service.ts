import {EventEmitter, Injectable, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationServiceSimple {
    public currentUserSubject: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        // this.currentUserSubject = new BehaviorSubject<String>(localStorage.getItem('selectedUser'));
    }

    public get currentUserValue(): String {
      this.currentUserSubject = new BehaviorSubject<any>(localStorage.getItem('selectedUser'));
        return this.currentUserSubject.value;
    }

    public userSubject: BehaviorSubject<any> = new BehaviorSubject(null);
    setSubject(value) {
      if (value) {
        this.userSubject.next(value);
      } else {
        this.userSubject.next(null);
      }
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('selectedUser');
        this.setSubject(null);
    }
}
