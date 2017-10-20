import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IUser } from './user';
import { AuthentificationService } from './authentification.service';

import { NumberValidators } from '..//number.validator';
import { GenericValidator } from '../generic-validator';

@Component({
    templateUrl: 'app/authentification/registers.component.html'
})
export class RegisterComponent implements OnInit, AfterViewInit {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    pageTitle: string = 'Registration';
    errorMessage: string;
    userForm: FormGroup;

    user: IUser;
    private sub: Subscription;

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;


    constructor(private fb: FormBuilder, private route: ActivatedRoute,
                private router: Router,
                private registerService: AuthentificationService) {

        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
           
            email : {
                required: 'The email is required.'
            },
            password : {
                 required: 'The password is required.',
                minlength: 'Password must be at least 6 characters.',
            },
           confirmPassword : {
                 required: 'The category is required.' ,
                  minlength: 'Password must be at least 6 characters.',
            },
        };

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.userForm = this.fb.group({
          
            email : ['', Validators.required],
            password : ['', [Validators.required,
                           Validators.minLength(3)]],
             confirmPassword :  ['', [Validators.required,
                              Validators.minLength(3)]],
         
        });

      
      
    }


    ngAfterViewInit(): void {
        // Watch for the blur event from any input element on the form.
        let controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

        // Merge the blur event observable with the valueChanges observable
        Observable.merge(this.userForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.userForm);
        });
    }

  
   
    
 onUserRetrieved(user: IUser): void {
        if (this.userForm) {
            this.userForm.reset();
        }
        this.user = user;


        
       this.userForm.patchValue({
         
            email : this.user.Email,
            password: this.user.Password,
            confirmPassword : this.user.ConfirmPassword,
                
        });
   console.log('email :' +this.user.Email);
      
    }

   

    saveUser(): void {
        if (this.userForm.dirty && this.userForm.valid) {
            // Copy the form values over the book object values
            let p = Object.assign({}, this.user, this.userForm.value);

            this.registerService.saveUser(p)
                .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.userForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.userForm.reset();
        this.router.navigate(['/shop',' ']);
    }
}
