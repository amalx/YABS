import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
 
@Component({
    selector: 'dashboard',
    template: `
<h4>Dashboard</h4>
<h3> Hello {{ userName }}  !!!! </h3> 
<form role="form" (submit)="logout()">
            <button type="submit" class="btn btn-danger btn-lg">Logout</button>
        </form>
 
    `
})
export class DashboardComponent implements OnInit {
 private userName = localStorage.getItem('userName');
    constructor(private _router: Router) {
    }
    ngOnInit() {
        if (!localStorage.getItem('access_token')) {
            this._router.navigate(['login']);
        }
    }
    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_in');
        localStorage.removeItem('token_type');
        localStorage.removeItem('userName');
 
        this._router.navigate(['login']);
    }
 
}