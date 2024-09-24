import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

    constructor() { }

    celsiusToFahrenheit(celsius: number): number {
        return (celsius * 9/5) + 32;
    }

    fahrenheitToCelsius(fahrenheit: number): number {
        return (fahrenheit - 32) * 5/9;
    }

    kilogramsToPounds(kilograms: number): number {
        return kilograms * 2.20462;
    }

    poundsToKilograms(pounds: number): number {
        return pounds / 2.20462;
    }

}