import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Service } from '../../../services/service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  loginError = false;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public service: Service,
    public authService: AuthService
  ) { }

  form: FormGroup = this.fb.group({});

  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required]],
    });
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

    this.auth.login(emailValue, passwordValue)
      .then((result: any) => {
        if (result.success) {

          this.service.loggedIn;
          console.log('Login successful');
          setTimeout(() => {
            this.service.toggleLoginForm();
          }, 1500);
          

        } else {
          // console.error('Login error:', result.status);
            this.loginError = true;
            setTimeout(() => {
              this.loginError = false;
            }, 3000);
        }
      })
      .catch(err => {
        // console.error('My login error:', err);
        if(err){
          this.loginError = true;
          setTimeout(() => {
            this.loginError = false;
          }, 3000);
        }
      });
  }


  // mark all fields as touched

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
 
}

