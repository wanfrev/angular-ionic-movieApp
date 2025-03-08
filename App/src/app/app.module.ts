import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular'; // This import is likely unnecessary here
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicFeatureModule } from './ionic.module';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicFeatureModule, // Keep this for Ionic-specific imports
    RouterModule.forRoot(routes, {useHash:true}) //useHash:true is crucial for standalone component routes
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
