import { Injectable } from '@angular/core';
import { Http, Response, Headers , RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import { IUser } from './user';

@Injectable()
export class AuthentificationService {
    private _registerUrl = 'http://localhost:2697/api/account/register';

    constructor(private _http: Http) { }


   
    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
 
  
 saveUser(user: IUser): Observable<IUser> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

   
            return this.createUser(user, options);
        }
        

 private createUser(user: IUser, options: RequestOptions): Observable<IUser> {
        user.UserId = undefined;
console.log( 'blaaaablaaaa');
        return this._http.post(this._registerUrl,user , options)
        //    .map(this.extractData)
            .do(data => console.log('createBook: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

   

    private extractData(response: Response) {
        let body = response.json();
        return body.data || {};
    }

 initializeUser(): IUser {
         // Return an initialized object
         return {
         UserId: 0,
         Email : null ,
         Password: null,
         ConfirmPassword: null,
        };
}
  
}