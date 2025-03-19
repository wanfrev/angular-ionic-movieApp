import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicFeatureModule } from './ionic.module';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { CommonModule } from '@angular/common';
import { MovieDetailPage } from './detail-movie/detail-movie.page';

@NgModule({
  declarations: [AppComponent, MovieDetailPage],
  imports: [
    BrowserModule,
    HttpClientModule, // HttpClientModule MUST be here
    IonicModule.forRoot(),
    IonicFeatureModule,
    RouterModule.forRoot(routes, { useHash: true }),
    CommonModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
