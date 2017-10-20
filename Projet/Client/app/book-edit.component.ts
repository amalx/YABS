import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IBook } from './book';
import { BookService } from './book.service';

import { NumberValidators } from './number.validator';
import { GenericValidator } from './generic-validator';

@Component({
    templateUrl: 'app/book-editer.component.html'
})
export class BookEditComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    pageTitle: string = 'Book Edit';
    errorMessage: string;
    bookForm: FormGroup;

    book: IBook;
    private sub: Subscription;

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    get tags(): FormArray {
        return <FormArray>this.bookForm.get('tags');
    }

    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private bookService: BookService) {

        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            name : {
                required: 'Book name is required.',
                minlength: 'Book name must be at least three characters.',
                maxlength: 'Book name cannot exceed 50 characters.'
            },
            price : {
                required: 'The price is required.'
            },
            author : {
                 required: 'The author name is required.'
            },
           category : {
                 required: 'The category is required.'
            },
          quantity : {
                 required: 'The quantity is required.'
            },
          photo : {
                 required: 'The PhotoUrl is required.'
            },
        };

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.bookForm = this.fb.group({
            name : ['', [Validators.required,
                               Validators.minLength(3),
                               Validators.maxLength(50)]],
            price : ['', Validators.required],
            author :  ['', Validators.required],
             category :  ['', Validators.required],
            quantity  :  ['', Validators.required],
             photo  :  ['', Validators.required],
        });

        // Read the book Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getBook(id);
            }
        );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngAfterViewInit(): void {
        // Watch for the blur event from any input element on the form.
        let controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

        // Merge the blur event observable with the valueChanges observable
        Observable.merge(this.bookForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.bookForm);
        });
    }

    addTag(): void {
        this.tags.push(new FormControl());
    }

    getBook(id: number): void {
        this.bookService.getBook(id)
            .subscribe(
                (book: IBook) => this.onBookRetrieved(book),
                (error: any) => this.errorMessage = <any>error
            );
    }

    onBookRetrieved(book: IBook): void {
        if (this.bookForm) {
            this.bookForm.reset();
        }
        this.book = book;

        if (this.book.bookId === 0  ) {
            this.pageTitle = 'Add Book'; 
    
        } else {
            this.pageTitle = `Edit Book: ${this.book.name}`;
 
        }

        // Update the data on the form
       this.bookForm.patchValue({
            name : this.book.name,
            price : this.book.price,
            author: this.book.author,
            category : this.book.category,
            quantity : this.book.quantity ,
            photo : this.book.photo ,        
        });
      
    }

    deleteBook(): void {
        if (this.book.bookId === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
       } else {
            if (confirm(`Really delete the Book: ${this.book.name}?`)) {
                this.bookService.deleteBook(this.book.bookId)
                    .subscribe(
                        () => this.onSaveComplete(),
                        (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    saveBook(): void {
        if (this.bookForm.dirty && this.bookForm.valid) {
            // Copy the form values over the book object values
            let p = Object.assign({}, this.book, this.bookForm.value);

            this.bookService.saveBook(p)
                .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.bookForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.bookForm.reset();
        this.router.navigate(['/books']);
    }
}
