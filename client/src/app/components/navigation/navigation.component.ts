import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthenticationService } from '../../services/authentication.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  loading: boolean = false;
  isLoading: Boolean = false;
  cookieValue = 'UNKNOWN';

  public user: User = new User();

  constructor(private authenticationService: AuthenticationService, private router: Router, private route: ActivatedRoute, private cookieService: CookieService) { }

  ngOnInit() {}

  logIn() {
    event.preventDefault(); // Avoid default action for the submit button of the login form

    // Calls service to login user to the api rest
    this.authenticationService.getUser(this.user.id).subscribe(

      res => {
       console.log(this.user.id);
        if (res) {
          this.cookieService.set( 'loading', 'true' );
          this.loading = true;
          this.isLoading = false;
          this.closeForm();
        }else{
          this.isLoading = true;
        }
        //console.log(this.user.id);
      },
      error => {
        console.error(error);
      },
      () => this.navigate()
    );

  }

  navigate() {
    this.router.navigateByUrl('/games');
    this.router.navigate(['/games']);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////

  logout() {
    // remove user from local storage to log user out
    this.cookieService.deleteAll();
    this.loading = null;
    this.navigate();
  }

  openForm() {
    document.getElementById("myForm").style.display = "block";
  }

  closeForm() {
    document.getElementById("myForm").style.display = "none";
  }
}
