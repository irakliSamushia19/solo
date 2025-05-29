import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {
  currencies: { [key: string]: string } = {};
  fromCurrency: string = 'usd';
  toCurrency: string = 'eur';
  amount: number = 1;
  result: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<{ [key: string]: string }>(
        'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.min.json'
      )
      .subscribe((data) => {
        this.currencies = data;
      });
  }

  get currencyCodes(): string[] {
    return Object.keys(this.currencies);
  }

  convert(): void {
    if (!this.amount || !this.fromCurrency || !this.toCurrency) return;

    this.http
      .get<any>(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${this.fromCurrency}.min.json`
      )
      .subscribe((data) => {
        const rate = data[this.fromCurrency][this.toCurrency];
        this.result = this.amount * rate;
      });
  }
}