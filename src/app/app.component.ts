import { Component } from '@angular/core';
import { NavComponent } from './nav/nav.component'; 
import { LifestyleComponent } from './lifestyle/lifestyle.component';
import { ConverterComponent } from './converter/converter.component';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavComponent, LifestyleComponent, ConverterComponent, CurrencyConverterComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
}