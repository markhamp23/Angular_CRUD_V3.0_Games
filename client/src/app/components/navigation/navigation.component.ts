import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthenticationService } from '../../services/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import Utils from '../../utils/utils';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  loading: boolean = false;
  isLoading: boolean = false;
  public user: User = new User();
  public usuariActual: User;

  constructor(private authenticationService: AuthenticationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  logIn() {
    event.preventDefault(); // Avoid default action for the submit button of the login form

    // Calls service to login user to the api rest
    this.authenticationService.getUser(this.user.id).subscribe(

      res => {
       console.log(this.user.id);
        if (res) {
          this.loading = true;
          this.isLoading = false;
          this.closeForm();
          this.authenticationService.usuariActual = new User;
        }else{
          this.isLoading = true;
        }
      },
      error => {
        console.error(error);
      },
      () => this.navigate()
    );
  }

  //////////////////////////////////////////////////////////////////////////////////////////////

  navigate() {
    this.router.navigateByUrl('/games');
    this.router.navigate(['/games']);
  }

  logout() {
    // remove user from local storage to log user out
    //this.actualUser == false;
    this.loading = null;
    this.authenticationService.logout();
    this.navigate()
    //location.reload();
  }

  openForm() {
    document.getElementById("myForm").style.display = "block";
  }

  closeForm() {
    document.getElementById("myForm").style.display = "none";
  }
}
