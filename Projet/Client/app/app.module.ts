import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {APP_BASE_HREF} from '@angular/common';
import { AppComponent }  from './app.component';
import {BookDetailComponent } from './book-detail.component';
import {BookListComponent } from './book-list.component';
import {HttpModule} from '@angular/http';
import {RouterModule } from '@angular/router';
import { BookEditComponent } from './book-edit.component';
import { BookDetailGuard, BookEditGuard } from './book-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShopComponent } from './shop.component';
import {BookFilterPipe } from './book-filter.pipe';
import { RegisterComponent } from './authentification/register.component';
import { AuthentificationService } from './authentification/authentification.service';
import { HomeComponent } from './authentification/home';
import { LoginComponent } from './authentification/login.component';
import { DashboardComponent } from './dashboard.component';
import { CartComponent } from './cart.component';

@NgModule({
  imports:      [ BrowserModule ,  HttpModule, FormsModule , ReactiveFormsModule  , RouterModule.forRoot([
 { path :'login',component: LoginComponent }, 
{ path :'cart',component: CartComponent },   
{ path :'home',component: HomeComponent }, 
 { path :'dashboard',component: DashboardComponent,
  children :[ 

 { path :'books',component: BookListComponent },
 {  path : 'book/:id', component : BookDetailComponent ,pathMatch:'full'},
 {  path : 'bookEdit/:id', canDeactivate: [ BookEditGuard ],component : BookEditComponent , pathMatch:'full'},
{ path : '', redirectTo : 'books', pathMatch:'full'}
] }, 
 { path :'register',component: RegisterComponent },  

{ path :'shop/:category', component: ShopComponent } ,
 {path : '', redirectTo :'shop/ ', pathMatch: 'full' },
 { path : '**',redirectTo: 'shop/ ',pathMatch:'full' },

   ]  )],
  declarations: [ AppComponent , BookListComponent, BookDetailComponent , BookEditComponent , ShopComponent, 
BookFilterPipe , RegisterComponent, DashboardComponent , HomeComponent , LoginComponent, CartComponent],
  bootstrap:    [ AppComponent ] ,
providers : [ {provide: APP_BASE_HREF, useValue : '/' } , BookDetailGuard,
    BookEditGuard ]
})
export class AppModule { }
