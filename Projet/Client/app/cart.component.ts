import { Component ,OnInit} from "@angular/core";
import { IBook } from './book' ;
import {ActivatedRoute , Router} from '@angular/router' ;
import { Subscription }       from 'rxjs/Subscription';
import { BookService } from './book.service';
import {BookListComponent} from './book-list.component' ;





@Component ({

    templateUrl:'app/cartt.component.html',
    
    //styleUrls: ['app/Books/bootstrap.css','app/Books/bootstrap.min.css','app/Books/shop-homepage.css']
    
})

export class CartComponent implements OnInit  {
    pageTitle : string = 'Mon panier' ;
cart : IBook[] ;
totalPrice :number ;
totalNumber : number ; 
    book : IBook ;
bool :boolean ;
auth : boolean ;
    constructor (private _route : ActivatedRoute, private _router : Router,private _bookService : BookService){};
    ngOnInit() :void 
{ //Afficher le bouton dashboard ou pas  
 if ( localStorage.getItem('userName')  == "sirine@gmail.com")

 {  this.bool=true;}
else this.bool=false; 


this.cart=JSON.parse(localStorage.getItem('cartItems')); 
this.totalPrice =JSON.parse(localStorage.getItem('totalPrice'));
this.totalNumber =JSON.parse(localStorage.getItem('totalNumber'));

}


onBack() : void{
    this._router.navigate(['/shop',' ']);
}

    Remove(book : IBook) :void {
    let id = this.cart.indexOf(book);
    this.cart.splice(id,1);
    this.totalPrice = this.totalPrice - +book.price * book.quantity ;
    this.totalNumber = this.totalNumber - +book.quantity ;
    
    localStorage.setItem('cartItems', JSON.stringify(this.cart));
    localStorage.setItem('totalNumber', JSON.stringify(this.totalNumber));
localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice));
 this._router.navigate(['/cart']);
}
 logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_in');
        localStorage.removeItem('token_type');
        localStorage.removeItem('userName');
     this.auth = false; this.bool = false;
        this._router.navigate(['shop',' ']);
    }

}