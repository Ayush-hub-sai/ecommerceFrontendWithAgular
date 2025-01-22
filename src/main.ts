import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment.development';
import { enableProdMode } from '@angular/core';

// Disable the console.log on live and test site
if (environment.production) {
  enableProdMode();
  window.console.log = () => { }
  window.console.warn = ()=>{}
  window.console.error = ()=> {}
}

if(environment.apiUrl === 'https://testuat.com/'){
  window.console.log = () => { }
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
