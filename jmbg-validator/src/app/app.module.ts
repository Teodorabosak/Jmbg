import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { JmbgValidatorComponent } from './jmbg-validator/jmbg-validator.component';

@NgModule({
  declarations: [AppComponent, JmbgValidatorComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
