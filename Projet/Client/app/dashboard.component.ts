import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
 
@Component({
    selector: 'dashboard',
  templateUrl: 'app/dashboard.component.html',
   styleUrls: ['app/sb-admin.css']
 
})
export class DashboardComponent implements OnInit {
bool :boolean ;
 private userName = localStorage.getItem('userName');
    constructor(private _router: Router) {
    }
    ngOnInit() {

      //  if (!localStorage.getItem('access_token')) {
      //      this._router.navigate(['login']);
      //  }
    }
    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_in');
        localStorage.removeItem('token_type');
        localStorage.removeItem('userName');
 
        this._router.navigate(['login']);
    }
 
}