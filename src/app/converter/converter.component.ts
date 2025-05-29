import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConverterService } from '../services/converter.service';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent {
  inputValue = '';
  inputFormat = 'dec';
  outputFormat = 'tc';
  bitLimit = 8;
  result = '';
  errorMessage = '';

  constructor(private convertService: ConverterService) {}

  onConvert(): void {
    this.errorMessage = '';
    const isValid = this.validateInput();

    if (!isValid) {
      this.result = '';
      this.errorMessage = 'Incorrect type of counting system.';
      return;
    }

    const parsedValue = this.inputFormat === 'dec' ? parseInt(this.inputValue, 10) : this.inputValue;
    this.result = this.convertService.convert(parsedValue, this.inputFormat, this.outputFormat, this.bitLimit);
  }

  validateInput(): boolean {
    const binRegex = new RegExp(`^[01]{1,${this.bitLimit}}$`);
    switch (this.inputFormat) {
      case 'dec':
        return /^-?\d+$/.test(this.inputValue);
      case 'bin':
      case 'sm':
      case 'oc':
      case 'tc':
      case 'ex':
        return binRegex.test(this.inputValue);
      default:
        return false;
    }
  }
}

