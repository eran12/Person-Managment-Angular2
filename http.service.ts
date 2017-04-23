import { User } from './shared/User';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observer } from 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class HttpService {
  private headers: Headers;
  private serverUrl = 'http://localhost:8080/Person_Managment_REST/user/';
  errorMessage: string;
  constructor(private http: Http,
              private router: Router) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
   }

  getAllUsers(): Observable<User[]> {
    const url = this.serverUrl + 'getall';
    return this.http.get(url)
                        .map((response: Response) => response.json())
                        .catch(this.handleError);
  }
  getUserById(id: number): Observable<User> {
    const header = this.headers;
    const url = this.serverUrl + 'userById?id=' + id;
    return this.http.get(url, this.headers)
                      .map((response: Response) => response.json())
                      .catch(this.handleError);
  }
  upDateUser(user: User): Observable<User> {
    const body = JSON.stringify(user);
    const url = this.serverUrl + 'edit';
    return this.http.put(url , body, {headers: this.headers})
                    .map((response: Response) =>  response.json())
                    .catch(this.handleError);
  }
  createNewUser(user: User): Observable<User> {
    const url = this.serverUrl + 'newuser';
   return this.http.post(url , JSON.stringify(user),
                        {headers: this.headers})
                    .map((response: Response) => response.json())
                    .catch(this.handleError);
  }
  deleteUser(user: User): Observable<any> {
    const bodyJson = JSON.stringify(user);
    const url = this.serverUrl + 'deleteUser';
    return this.http.delete(url, new RequestOptions({
                            headers: this.headers,
                            body: bodyJson}))
                    .map((response: Response) => response.json())
                    .catch(this.handleError);
  }
  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.log(error.json());
    return Observable.throw(error);
  }
}
