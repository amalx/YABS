import { Component, OnInit }  from '@angular/core';

import { IBook } from './book';
import { BookService } from './book.service';

@Component({
    
    templateUrl: './app/book-liste.component.html',
    styleUrls: ['./app/book-list.component.css']
})
export class BookListComponent implements OnInit {
    pageTitle: string = 'Book List';
    
    listFilter: string;
    errorMessage: string;

    books: IBook[];

    constructor(private _bookService: BookService) {

    }

   
    ngOnInit(): void {
        this._bookService.getBooks()
                .subscribe(books => this.books = books,
                           error => this.errorMessage = <any>error);
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Book List: ' + message;
    }
}
