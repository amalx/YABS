import { Injectable } from '@angular/core';
import { Http, Response, Headers , RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import { Order } from './order';

@Injectable()
export class OrderService {
    private _orderUrl = 'http://localhost:2697/api/orders';

    constructor(private _http: Http) { }


   
    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
 

  saveOrder(order: Order): Observable<Order> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.createOrder(order, options);
       
    }

 private createOrder(order: Order, options: RequestOptions): Observable<Order> {
        order.idOrder = undefined;
        return this._http.post(this._orderUrl, order, options)
            .map(this.extractData)
            .do(data => console.log('createBook: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

 

    private extractData(response: Response) {
        let body = response.json();
        return body.data || {};
    }

 initializeOrder(): Order {
        // Return an initialized object
        return {
    idOrder : 0 ,
    userName : null,
    country : null ,
    firstName : null ,
    lastName : null, 
    address : null ,
    city : null ,
    state : null ,
    postalCode : null ,
    phoneNumber : null ,
    email : null ,
    cardType : null ,
    creditCardNumber : null 
        };
}
  
}