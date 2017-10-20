import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { BookEditComponent } from './book-edit.component';

@Injectable()
export  class BookDetailGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        let id = +route.url[1].path;
        if (isNaN(id) || id < 1) {
            alert('Invalid book Id');
            // start a new navigation to redirect to list page
            this.router.navigate(['/books']);
            // abort current navigation
            return false;
        };
        return true;
    }
}

@Injectable()
export  class BookEditGuard implements CanDeactivate<BookEditComponent> {

    canDeactivate(component: BookEditComponent): boolean {
        if (component.bookForm.dirty) {
            let bookName = component.bookForm.get('bookName').value || 'New Book';
            return confirm(`Navigate away and lose all changes to ${bookName}?`);
        }
        return true;
    }
}
