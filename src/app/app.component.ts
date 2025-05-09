import { Component } from '@angular/core';
import { NavComponent } from './nav/nav.component'; 
import { LifestyleComponent } from './lifestyle/lifestyle.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavComponent, LifestyleComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
}