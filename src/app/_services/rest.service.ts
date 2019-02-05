import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpResponse} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import {environment} from '../../environments/environment';
import { Globals } from '../globals';

const httpOptions = {
  params: new HttpParams(),
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': '6e0eeb81c3f04afd96fc4f5f7386caf3',
    // 'Api-Version': 'v2',
    'Ocp-Apim-Trace': 'true'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private apiURLKudos: string;

  constructor(private http: HttpClient, private globals: Globals) {
    this.apiURLKudos = this.globals.urlBackend + '/v2/kudos';
  }

  private extractData(res: Response) {
    const body = res;
    return body || { };
  }

  getKudos(): Observable<any> {
    console.log(this.globals.urlBackend);
    return this.http.get(this.apiURLKudos, httpOptions).pipe(
      map(this.extractData));
  }

  getKudosById(kudoid: string): Observable<any> {
    return this.http.get(this.apiURLKudos + '/' + kudoid, httpOptions).pipe(
      map(this.extractData));
  }


  addKudos (kudo): Observable<any> {
    console.log(kudo);
    return this.http.post<any>(this.apiURLKudos, JSON.stringify(kudo), httpOptions).pipe(
      catchError(this.handleError<any>('addProduct'))
    );
  }

  updateKudos (kudo): Observable<any> {
    console.log('update kudo:' + JSON.stringify(kudo));
    return this.http.put(this.apiURLKudos + '/' + kudo.id + '?pKey=' + kudo.receiver, JSON.stringify(kudo), httpOptions).pipe(
      tap(_ => console.log(`updated kudo=${kudo}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  deleteKudos (kudo): Observable<any> {
    const httpOptionsDel = {
      params: new HttpParams(),
      headers: new HttpHeaders({
        'Ocp-Apim-Subscription-Key': '6e0eeb81c3f04afd96fc4f5f7386caf3',
        'Ocp-Apim-Trace': 'true'
      }),
      body: 'text'
    };

    const apiurl = this.apiURLKudos + '/' + kudo.id + '?pKey=' + kudo.receiver;
    return this.http.delete(apiurl, httpOptionsDel).pipe(
      catchError(this.handleError<any>('deleteKudos'))
    );
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
