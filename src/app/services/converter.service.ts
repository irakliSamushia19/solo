import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConverterService {

  private padBinary(binary: string, limit: number): string {
    return binary.padStart(limit, '0');
  }

  private binToDecSigned(binary: string): number {
    return binary.split('').reduce((acc, bit, idx) =>
      acc + parseInt(bit) * 2 ** (binary.length - 1 - idx), 0);
  }

  convert(input: string | number, from: string, to: string, bitLimit: number): string {
    if (typeof input === 'string') {
      const bin = this.padBinary(input, bitLimit);
      let result = 0;

      switch (from) {
        case 'sm':
          result = this.binToDecSigned(bin.slice(1)) * (bin[0] === '1' ? -1 : 1);
          break;
        case 'oc':
          if (bin[0] === '0') result = this.binToDecSigned(bin);
          else result = -this.binToDecSigned(
            bin.slice(1).split('').map(b => b === '0' ? '1' : '0').join('')
          );
          break;
        case 'tc':
          if (bin[0] === '0') result = this.binToDecSigned(bin);
          else {
            const inverted = bin.split('').map(b => b === '0' ? '1' : '0').join('');
            result = -this.binToDecSigned(inverted) - 1;
          }
          break;
        case 'ex':
          result = this.binToDecSigned(bin) - 2 ** (bitLimit - 1);
          break;
        case 'bin':
          result = this.binToDecSigned(bin);
          break;
        case 'dec':
          result = parseInt(input, 10);
          break;
      }

      return `${input} in ${from.toUpperCase()} = ${result} in DEC`;
    } else {
      let num = input;
      let output = '';

      switch (to) {
        case 'sm':
          const sign = num < 0 ? '1' : '0';
          num = Math.abs(num);
          output = sign + this.padBinary(num.toString(2), bitLimit - 1);
          break;
        case 'oc':
          if (num < 0) {
            const inverted = this.padBinary((-num).toString(2), bitLimit - 1)
              .split('').map(b => b === '0' ? '1' : '0').join('');
            output = '1' + inverted;
          } else {
            output = this.padBinary(num.toString(2), bitLimit);
          }
          break;
        case 'tc':
          if (num < 0) {
            const absVal = Math.abs(num + 1);
            const inverted = this.padBinary(absVal.toString(2), bitLimit)
              .split('').map(b => b === '0' ? '1' : '0').join('');
            output = inverted;
          } else {
            output = this.padBinary(num.toString(2), bitLimit);
          }
          break;
        case 'ex':
          const offset = 2 ** (bitLimit - 1);
          output = this.padBinary((num + offset).toString(2), bitLimit);
          break;
        case 'bin':
          output = this.padBinary(num.toString(2), bitLimit);
          break;
        case 'dec':
          output = num.toString(10);
          break;
      }

      return `${input} in DEC = ${output} in ${to.toUpperCase()}`;
    }
  }
}