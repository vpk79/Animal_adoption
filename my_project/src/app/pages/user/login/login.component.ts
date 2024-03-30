import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  form: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    console.log('login');
    const emailValue = this.form.get('email')?.value;
    const passwordValue = this.form.get('password')?.value;
    this.auth.login(emailValue, passwordValue);
    this.closeLogin();
  }

  closeLogin(){
    const getForm = document.getElementById('login-form');
    
    if(getForm != null){
      getForm.style.display = 'none';
    }
  }
}

