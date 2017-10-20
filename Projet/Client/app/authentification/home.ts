import {Component} from '@angular/core';
 
@Component({
    selector: 'home',
    template: `
        <h4>Home</h4>
        <br/>
        <p>Token:<b>{{access_token}}</b></p>
        <p>Expires In:<b>{{expires_in}}</b></p>
        <p>Token Type:<b>{{token_type}}</b></p>
        <p>Username:<b>{{userName}}</b></p>    
    `
})
export class HomeComponent {
    private access_token = localStorage.getItem('access_token');
    private expires_in = localStorage.getItem('expires_in');
    private token_type = localStorage.getItem('token_type');
    private userName = localStorage.getItem('userName');     
}