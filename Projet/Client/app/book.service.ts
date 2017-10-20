import { Injectable } from '@angular/core';
import { Http, Response, Headers , RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import { IBook } from './book';

@Injectable()
export class BookService {
    private _bookUrl = 'http://localhost:2697/api/books';

    constructor(private _http: Http) { }
//Liste des books
    getBooks(): Observable<IBook[]> {
        return this._http.get(this._bookUrl)
            .map((response: Response) => <IBook[]> response.json())
            .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

   
    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
  getBook(id: number): Observable<IBook> {
   if (id === 0) {
        return Observable.of(this.initializeBook()); }
else {
        return this.getBooks()
            .map((books: IBook[]) => books.find(p => p.bookId === id)); }
    }

   deleteBook(id: number): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this._bookUrl}/${id}`;
        return this._http.delete(url, options)
           .map((response: Response) => <IBook[]> response.json())
            .do(data => console.log('deleteBook: ' + JSON.stringify(data)))
            .catch(this.handleError);
    } 
 saveBook(book: IBook): Observable<IBook> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (book.bookId === 0) {
            return this.createBook(book, options);
        }
        return this.updateBook(book, options);
    }

 private createBook(book: IBook, options: RequestOptions): Observable<IBook> {
        book.bookId = undefined;
        return this._http.post(this._bookUrl, book, options)
            .map(this.extractData)
            .do(data => console.log('createBook: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

   private updateBook(book: IBook, options: RequestOptions): Observable<IBook> {
        const url = `${this._bookUrl}/${book.bookId}`;
        return this._http.put(url,book, options)
              .map((response: Response) => <IBook[]> response.json())
            .do(data => console.log('updateBook: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private extractData(response: Response) {
        let body = response.json();
        return body.data || {};
    }

 initializeBook(): IBook {
        // Return an initialized object
        return {
         bookId: 0,
         name: null,
         price: null,
         author: null,
         category: null,
         quantity : null,
         photo: null 
        };
}
  getSearch(category : string): Observable<IBook[]> {
 if(category === ' ') {
return this.getBooks();
}       
else 
{
 return this.getBooks()
            .map((books: IBook[]) => books.filter(p => p.category === category)); } }
}