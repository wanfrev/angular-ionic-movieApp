// filepath: c:\Users\wanfr\OneDrive\Documentos\Computer-Engineering\URU\Moviles\movieApp\App\src\app\app.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicFeatureModule } from './ionic.module';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { MovieDetailPage } from './detail-movie/detail-movie.page'; // Importa MovieDetailPage

@NgModule({
  declarations: [AppComponent, MovieDetailPage], // Declara MovieDetailPage
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    IonicFeatureModule,
    RouterModule.forRoot(routes, { useHash: true }),
    CommonModule // Agrega CommonModule aquí
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Agrega esta línea
})
export class AppModule { }
