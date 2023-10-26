import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './root/features/nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';

import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './search/search.component';
import { PlayerComponent } from './root/features/player/player.component';
import { LibraryService } from './root/data-access/library.service';
import { LibItemComponent } from './root/ui/lib-item/lib-item.component';
import { SvgComponent } from './shared/features/svg/svg.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    SearchComponent,
    PlayerComponent,
    LibItemComponent,
    SvgComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
