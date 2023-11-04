import { Component } from '@angular/core';
import { AuthService } from './shared/data-access/auth.service';
import { ActivatedRoute, NavigationEnd, Router, } from '@angular/router';
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
    private location: Location) { }
    
  ngOnInit(): void{
    let token = this.authServces.getToken();
    if (!token){
      this.authServces.generateToken()
    }

    this.route.events.pipe(filter(e=> e instanceof NavigationEnd))
    .subscribe(_=>{
      this.searchOpened = this.location.path().split('/')[1]==='search' 
    });
  }
    
  login(): void{
    document.location = `${environment.authUrl}/login`
  }
}
