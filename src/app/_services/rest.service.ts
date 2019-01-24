import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import {environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': '6e0eeb81c3f04afd96fc4f5f7386caf3',
    'Api-Version': 'v2',
    'Ocp-Apim-Trace': 'true'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private apiURLKudos = environment.apiUrlBackend + '/kudos';

  constructor(private http: HttpClient) {}

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getKudos(): Observable<any> {
    return this.http.get(this.apiURLKudos, httpOptions).pipe(
      map(this.extractData));
  }


  addKudos (kudo): Observable<any> {
    console.log(kudo);
    return this.http.post<any>(this.apiURLKudos + '/add', JSON.stringify(kudo), httpOptions).pipe(
      tap((product) => console.log(`added product w/ id=${product.id}`)),
      catchError(this.handleError<any>('addProduct'))
    );
  }

  updateKudos (kudo): Observable<any> {
    return this.http.put(this.apiURLKudos + '/update', JSON.stringify(kudo), httpOptions).pipe(
      tap(_ => console.log(`updated product id=${kudo}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  deleteKudos (id): Observable<any> {
    return this.http.delete<any>(this.apiURLKudos + '/delete' + id, httpOptions).pipe(
      tap(_ => console.log(`deleted kudos id=${id}`)),
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
