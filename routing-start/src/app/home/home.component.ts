import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onLogin() {
    this.authService.login();
  }

  onLogout() {
    this.authService.logout();
  }

  onLoadServers() {
    // complex calculations

    // variant 1: navigating using the absolute path "/servers"
    // this.router.navigate(['/servers'])

    // variant 2: navigating using the  path "servers" relative to "this.route"
    this.router.navigate(['servers'], { relativeTo: this.route });
  }

  onLoadServer(id: number) {
    this.router.navigate(['/servers', id, 'edit'],
      {
        queryParams: { allowEdit: id === 3 },
        fragment: 'loading'
      }
    )
  }
}
