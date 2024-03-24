import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private auth: AuthService) { }


  fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  onSubmit(): void {
    console.log('login');

  }


}
