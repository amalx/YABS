import {Component, Input , Output } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Router} from '@angular/router';
 
@Component({

templateUrl: 'app/authentification/login.component.html',
   styleUrls: ['app/authentification/style.css']
 
   /*
    template: `
        <h4>Login</h4>
        <br/>
        <form role="form" (submit)="login($event, username.value, password.value)">
            <input type="text" #username id="username" required="required" placeholder="Username"> <br/>
            <input type="password" #password id="password" required="required" placeholder="Password"> <br/>
            <button type="submit">Login</button> <br/>
        </form>
    `,
    providers: [
       
    ]     */
})
export class LoginComponent {
@Input() bool :boolean  ;  
  private title = 'Login';
 
    constructor(private _router: Router,  private _http: Http) {
    }   
       
    login(event: any , username :any , password : any) {
        event.preventDefault();
         
        let url = "http://localhost:2697/token";
        let body = "username=" + username + "&password=" + password + "&grant_type=password";
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });        
         
        this._http.post(url, body, options).subscribe(
            response => {
                localStorage.setItem('access_token', response.json().access_token);
                localStorage.setItem('expires_in', response.json().expires_in);
                localStorage.setItem('token_type', response.json().token_type);
                localStorage.setItem('userName', response.json().userName);
                this._router.navigate(['shop',' ']);
            },
            error => {
                alert(error.text());
                console.log(error.text());
            }
        );
    
 if ( username == "sirine@gmail.com")

 { localStorage.setItem('dashboard', 'true'); }
else localStorage.setItem('dashboard', 'false'); 
    }    
}