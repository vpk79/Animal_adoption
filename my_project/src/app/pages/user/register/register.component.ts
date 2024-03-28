import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  form: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

   






onSubmit(): void {
  const emailValue = this.form.get('email')?.value;
  const passwordValue = this.form.get('password')?.value;
  // console.log('register');
  console.log(emailValue, passwordValue);
  this.auth.register(emailValue, passwordValue)
}

}
