import { Component, OnInit }  from '@angular/core';

import { IBook } from './book';
import { BookService } from './book.service';
import {ActivatedRoute , Router} from '@angular/router' ;
import { Subscription }       from 'rxjs/Subscription';
@Component({
    
    templateUrl: 'app/shop.component.html',
   styleUrls: ['app/shop.component.css']
})
//
export class ShopComponent implements OnInit {
    pageTitle: string = 'Book List'; 
    private sub: Subscription;
    listFilter: string;
    errorMessage: string;
 quantity:number =1 ;
    totalPrice : number ;
    totalNumber :number ;
    books: IBook[];
      cart : IBook[]  ; 
bool : boolean ;
auth :boolean ;
    constructor(private _route : ActivatedRoute, private _router : Router,private _bookService: BookService,
 ) {

    }
    
      getBooks(category: string) {
        this._bookService.getSearch(category).subscribe(
            books => this.books = books,
            error => this.errorMessage = <any>error);
    }
   
    ngOnInit(): void {
 if (localStorage.getItem('access_token'))
 { this.auth = true; }
else this.auth = false;
    

 

// Afficher le bouton dashboard ou pas 
 if ( localStorage.getItem('userName')  == "sirine@gmail.com")

 {  this.bool=true;}
else this.bool=false; 


this.cart =JSON.parse(localStorage.getItem('cartItems'));
this.totalNumber =JSON.parse(localStorage.getItem('totalNumber'));
this.totalPrice =JSON.parse(localStorage.getItem('totalPrice'));   
if(this.cart == null) { this.cart = [] ;} 
if(this.totalNumber == undefined) { this.totalNumber = 0 ;} 
if(this.totalPrice == undefined) { this.totalPrice = 0 ;}  
  this.sub = this._route.params.subscribe(
            params => {
                let category = params['category'];
                this.getBooks(category);
        });
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Book List: ' + message;
    }



       SelectedBook(book :IBook): void {
if(this.cart == null) { this.cart = [] ;} 
if(this.totalNumber == undefined) { this.totalNumber = 0 ;} 
if(this.totalPrice == undefined) { this.totalPrice = 0 ;}  
if(this.cart.indexOf(book) === -1 )
{    
book.quantity =this.quantity;
this.cart.push (book);
this.cart[this.cart.length -1].quantity = this.quantity ; 

 } 
else 
{  
let $id = this.cart.indexOf(book);
  this.cart[$id].quantity =  +this.cart[$id].quantity +  +this.quantity; 

}
this.totalPrice = this.totalPrice + +book.price* this.quantity;
this.totalNumber = +this.totalNumber + +this.quantity;
localStorage.setItem('cartItems', JSON.stringify(this.cart));
localStorage.setItem('totalNumber', JSON.stringify(this.totalNumber));
localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice));
this.quantity=1;

}
      EmptyCart()
    {  localStorage.removeItem('cartItems');
       localStorage.removeItem('totalNumber');
       localStorage.removeItem('totalPrice');
   this.totalNumber=0;
   this.totalPrice=0;

    this._router.navigate(['/shop',' ']);
     }

  logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_in');
        localStorage.removeItem('token_type');
        localStorage.removeItem('userName');
     this.auth = false; this.bool = false;
        this._router.navigate(['/shop',' ']);
    }
}
