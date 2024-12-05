import { Component } from '@angular/core';
import { JmbgValidatorComponent } from './jmbg-validator/jmbg-validator.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, JmbgValidatorComponent],  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'JMBG Validator';
}

