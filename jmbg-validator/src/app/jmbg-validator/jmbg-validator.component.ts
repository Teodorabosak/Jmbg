import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-jmbg-validator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './jmbg-validator.component.html',
  styleUrls: ['./jmbg-validator.component.css'],
})
export class JmbgValidatorComponent {
  name: string = '';
  surname: string = '';
  jmbg: string = '';
  validationMessage: string = '';

  
  validateJMBG(): void {

    if (!this.name || !this.surname || !this.jmbg) {
      this.validationMessage = 'Molimo vas da popunite sva obavezna polja!';
      return;
    }

    if (this.jmbg.length !== 13 || isNaN(Number(this.jmbg))) {
      this.validationMessage = 'Proveri da li si uneo ispravan jmbg.';
      return;
    }

    const digits = this.jmbg.split('').map(Number);
    const control = digits[12]; // Kontrolna cifra
    const calculatedControl = this.calculateControlDigit(digits);

    if (control !== calculatedControl) {
      this.validationMessage = `Kontrolna cifra je pogrešna! Očekivana kontrolna cifra je: ${calculatedControl}.`;
      return;
    }

    const details = this.getDetailsFromJMBG(this.jmbg);
    this.validationMessage = `
      JMBG je validan! <br>
      Ime: ${this.name}, <br>
      Prezime: ${this.surname}, <br>
      Datum rođenja: ${details.dateOfBirth}, <br>
      Politička regija: ${details.region}, <br>
      Pol: ${details.gender}.
    `;
  }

  calculateControlDigit(digits: number[]): number {
    const weights = [7, 6, 5, 4, 3, 2]; //brojevi su unapred definisani i predstavljaju težine koje se dodeljuju prvih 6 cifara 
    let sum = 0; //rez

    for (let i = 0; i < 6; i++) {
      sum += digits[i] * weights[i] + digits[i + 6] * weights[i];
    }

    const calculatedControl = 11 - (sum % 11);
    return calculatedControl > 9 ? 0 : calculatedControl; //ako je izracunata veca od 10 postavi na 0 ako nije ostaje ista
  }



  getDetailsFromJMBG(jmbg: string): {
    dateOfBirth: string;
    region: string;
    gender: string;
    
  } {
    const day = parseInt(jmbg.slice(0, 2));
    const month = parseInt(jmbg.slice(2, 4));
    const yearPart = parseInt(jmbg.slice(4, 7));//000-999
    const regionCode = parseInt(jmbg.slice(7, 9)); // politički regija rođenja
    const genderCode = parseInt(jmbg.slice(9, 12));

    const year = yearPart >= 900
  ? 1000 + yearPart 
  : 2000 + yearPart; 

  
    const region = this.getRegionName(regionCode);

    const gender = genderCode < 500 ? 'Muški' : 'Ženski';
    


    return {
      dateOfBirth: `${day}.${month}.${year}`,
      region,
      gender
    };
  }
  
  getRegionName(code: number): string {
    switch (true) {
      case code >= 1 && code <= 9:
        return 'Stranci bez državljanstva bivše SFRJ ili njenih naslednica';
  
      case code >= 10 && code <= 19:
        switch (code) {
          case 10: return 'Banja Luka';
          case 11: return 'Bihać';
          case 12: return 'Doboj';
          case 13: return 'Goražde';
          case 14: return 'Livno';
          case 15: return 'Mostar';
          case 16: return 'Prijedor';
          case 17: return 'Sarajevo';
          case 18: return 'Tuzla';
          case 19: return 'Zenica';
          default: return 'Nepoznata regija';
        }
  
      case code >= 20 && code <= 29:
        switch (code) {
          case 21: return 'Podgorica';
          case 26: return 'Nikšić';
          case 29: return 'Pljevlja';
          default: return 'Nepoznata regija';
        }
  
      case code >= 30 && code <= 39:
        switch (code) {
          case 30: return 'Osijek, Slavonija region';
          case 31: return 'Bjelovar, Virovitica, Koprivnica, Pakrac, Podravina region';
          case 32: return 'Varaždin, Međimurje region';
          case 33: return 'Zagreb';
          case 34: return 'Karlovac';
          case 35: return 'Gospić, Lika region';
          case 36: return 'Rijeka, Pula, Istra and Primorje region';
          case 37: return 'Sisak, Banovina region';
          case 38: return 'Split, Zadar, Dubrovnik, Dalmacija region';
          default: return 'Nepoznata regija';
        }
  
      case code >= 41 && code <= 49:
        switch (code) {
          case 41: return 'Bitola';
          case 42: return 'Kumanovo';
          case 43: return 'Ohrid';
          case 44: return 'Prilep';
          case 45: return 'Skopje';
          case 46: return 'Strumica';
          case 47: return 'Tetovo';
          case 48: return 'Veles';
          case 49: return 'Štip';
          default: return 'Nepoznata regija';
        }
  
      case code >= 70 && code <= 79:
        switch (code) {
          case 71: return 'Beograd region';
          case 72: return 'Šumadija';
          case 73: return 'Niš region';
          case 74: return 'Južna Morava';
          case 75: return 'Zaječar';
          case 76: return 'Podunavlje';
          case 77: return 'Podrinje i Kolubara';
          case 78: return 'Kraljevo region';
          case 79: return 'Užice region';
          default: return 'Nepoznata regija';
        }
  
      case code >= 80 && code <= 89:
        switch (code) {
          case 80: return 'Novi Sad region';
          case 81: return 'Sombor region';
          case 82: return 'Subotica region';
          case 85: return 'Zrenjanin region';
          case 86: return 'Pančevo region';
          case 87: return 'Kikinda region';
          case 88: return 'Ruma region';
          case 89: return 'Sremska Mitrovica region';
          default: return 'Nepoznata regija';
        }
  
      case code >= 90 && code <= 99:
        switch (code) {
          case 91: return 'Priština region';
          case 92: return 'Kosovska Mitrovica region';
          case 93: return 'Peć region';
          case 94: return 'Đakovica region';
          case 95: return 'Prizren region';
          case 96: return 'Kosovsko Pomoravski okrug';
          default: return 'Nepoznata regija';
        }
  
      default:
        return 'Nepoznata regija';
    }
  }
  
}