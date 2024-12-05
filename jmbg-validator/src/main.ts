import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http'; // Uvezi provideHttpClient

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient() // Samo provideHttpClient, bez interceptora
  ]
})
  .catch(err => console.error(err));
