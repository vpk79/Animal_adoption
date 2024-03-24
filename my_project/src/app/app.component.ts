import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomeModule } from './src/home/home.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  // imports: [CommonModule, RouterOutlet, RouterLink, HomeModule]
})
export class AppComponent {
  title = 'my_project';

  http = inject(HttpClient);

  logout(): void {
    console.log('logout');
    
  }
}
