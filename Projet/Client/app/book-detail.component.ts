import { Component ,OnInit} from "@angular/core";
import { IBook } from './book' ;
import {ActivatedRoute , Router} from '@angular/router' ;
import { Subscription }       from 'rxjs/Subscription';
import { BookService } from './book.service';


@Component(
    {
      templateUrl : 'app/book-detail.component.html'
    }
)
export class BookDetailComponent implements OnInit {
  pageTitle : string = "Book Detail ";
  book : IBook ;
 private sub: Subscription;
 errorMessage: string;
  constructor (private _route : ActivatedRoute, private _router : Router,private _bookService : BookService){};
ngOnInit() :void 
{
    this.sub = this._route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getBook(id);
        });
}

onBack() : void{
    this._router.navigate(['/books']);
}



    getBook(id: number) {
        this._bookService.getBook(id).subscribe(
            book => this.book = book,
            error => this.errorMessage = <any>error);
    }
}