import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { GamesListComponent } from './components/games-list/games-list.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; //importing the module
import { Ng2OrderModule } from 'ng2-order-pipe'; //importing the module
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

// Services
import { GamesService } from './services/games.service';
import { GameFormComponent } from './components/game-form/game-form.component';
import { FooterComponent } from './components/footer/footer.component';
import { Footer2Component } from './components/footer2/footer2.component';
import { AuthenticationService } from './services/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { GameViewComponent } from './components/game-view/game-view.component';
import { GamesApiComponent } from './components/games-api/games-api.component';
import { SpinnerLoaderComponent } from './component/spinner-loader/spinner-loader.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    GamesListComponent,
    GameFormComponent,
    FooterComponent,
    Footer2Component,
    GameViewComponent,
    GamesApiComponent,
    SpinnerLoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule, //including into imports
    Ng2OrderModule, //add here
    NgxPaginationModule,
    FormsModule,
    Ng4LoadingSpinnerModule
  ],
  providers: [
    GamesService, 
    AuthenticationService,
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }