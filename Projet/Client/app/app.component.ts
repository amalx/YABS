import { Component , OnChanges } from '@angular/core';
import { BookService } from './book.service';
import { AuthentificationService } from './authentification/authentification.service';
import {Router} from '@angular/router';
@Component({
  selector: 'my-app',
   templateUrl: './app/app.component.html' ,
  styleUrls: ['./node_modules/bootstrap/dist/css/bootstrap.css'],
   providers : [ BookService , AuthentificationService ] ,
    }
)
export class AppComponent implements OnChanges { 
bool : boolean   ;
username : string ;

 constructor(private _router: Router) {
    }


ngOnInit():void
{ this.username = localStorage.getItem('userName')
 if ( this.username == "sirine@gmail.com")

 { this.bool = true ; }
else this.bool=false;


}
ngOnChanges()
{  console.log('changes');
 if ( localStorage.getItem('dashboard')  == "true")

 {  this.bool=true;}
else this.bool=false; 


}

logout()
{
      localStorage.removeItem('access_token');
        localStorage.removeItem('expires_in');
        localStorage.removeItem('token_type');
        localStorage.removeItem('userName');
     this.bool=false;
localStorage.setItem('dashboard', 'false');  
        this._router.navigate(['Login']);

}

 }
