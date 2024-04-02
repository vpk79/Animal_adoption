import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Service } from '../../../services/service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  submitted = false;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public service: Service
  ) { 
    this.form.valueChanges.subscribe(() => {
      if (this.submitted) {
        this.submitted = false;
      }
    });
  }

  form: FormGroup = this.fb.group({});

  ngOnInit(): void {


    this.form = this.fb.nonNullable.group({
      firstname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), this.nameValidator]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), this.nameValidator]],
      email: ['', [Validators.required, this.emailValidator]],
      gender: ['gender', [Validators.required]],
      adultcheck: [false, Validators.requiredTrue],
      license: [false, Validators.requiredTrue],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      rePassword: ['', [Validators.required]]
    });

    
  }

  nameValidator(control: FormControl): { [key: string]: any } | null {
    const namePattern = /^[a-zA-Z]+$/;

    if (control.value && !namePattern.test(control.value)) {
      return { 'invalidName': true };
    }
    return null;
  }


  onSubmit(): void {
    this.submitted = true

    if (!this.form) {
      return;
    }

    if (this.form.invalid) {
      this.markFormGroupTouched(this.form);
      console.log('form is invalid');
      return;
    }

    const emailValue = this.form.get('email')?.value;
    const passwordValue = this.form.get('password')?.value;
    const firstname = this.form.get('firstname')?.value;
    const lastname = this.form.get('lastname')?.value;
    const gender = this.form.get('gender')?.value;
   
    // console.log('register');
    console.log(emailValue, passwordValue);
    this.auth.register(emailValue, passwordValue, firstname, lastname, gender)
  }


  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

 
  

  emailValidator(control: FormControl): { [key: string]: any } | null {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (control.value && !emailPattern.test(control.value)) {
      return { 'email': true };
    }
    return null;
  }


}
