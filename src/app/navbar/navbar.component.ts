import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

    isLoggedIn$: Observable<boolean>;
    
  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService, private router: Router) {}
    
  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
}
