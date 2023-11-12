import { Component } from '@angular/core';
import { AuthService } from './shared/data-access/auth.service';
import { NavigationEnd, Router, } from '@angular/router';
import {OverlayContainer} from '@angular/cdk/overlay';

import { Location } from '@angular/common';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchOpened: boolean = false;
  
  constructor(private authServces: AuthService,
    public route: Router,
    private location: Location,
    private overlayContainer: OverlayContainer,) { }
    
  ngOnInit(): void{
    console.log(this.location)
    this.overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');

    this.authServces.initAuth();

    this.route.events.pipe(filter(e=> e instanceof NavigationEnd))
    .subscribe(_=>{
      this.searchOpened = this.location.path().split('/')[1]==='search' 
    });
  }
    
  login(): void{
    document.location = `${environment.authUrl}/login`
  }

  goback(){
    console.log('vfcrvgfcd')
    this.location.back()
  }
  goforward(){
    this.location.forward()
  }
}
