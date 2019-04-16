import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  validateUser: boolean = false;
  currentUser: User;
  users: User[] = [];

  constructor(private authenticationService: AuthenticationService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {}

logIn(username: string, password: string, event: Event) {
  event.preventDefault(); // Avoid default action for the submit button of the login form

  // Calls service to login user to the api rest
  this.authenticationService.login(username, password).subscribe(

    res => {
     console.log(res);
     this.validateUser = true;
    },
    error => {
      console.error(error);
    },
    () => this.navigate()
  );

}

navigate() {
  this.closeForm();
  this.router.navigateByUrl('/games');
  this.router.navigate(['/games']);
}

//////////////////////////////////////////////////////////////////////////////////////////////

  logout() {
    this.validateUser = null;
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    console.log('hola');
  }

  openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  closeForm() {
    document.getElementById("myForm").style.display = "none";
  }
}
